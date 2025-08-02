import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import http from "http";

import authRoute from "./routes/authRoute.js";
import profileRoute from "./routes/profileRoute.js";
import gigRoute from "./routes/gigRoute.js";
import messageRoute, { saveMessage } from "./routes/messageRoute.js";
import connectDB from "./config/mongooseConnection.js";
import orderRoute from "./routes/ordersRoute.js";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

connectDB();

const allowedOrigins = [
  "http://localhost:5173",
  "https://gigconnect.vercel.app",
];

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/profilePics", express.static(path.join(__dirname, "profilePics")));
app.use("/thumbnails", express.static(path.join(__dirname, "thumbnails")));

app.use("/", authRoute);
app.use("/profile", profileRoute);
app.use("/gig", gigRoute);
app.use("/messages", messageRoute);
app.use("/orders", orderRoute);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
  transports: ["websocket", "polling"],
  pingTimeout: 60000,
  pingInterval: 25000,
});

const users = new Map();
const userRooms = new Map();
const onlineUsers = new Set();

const broadcastUserStatus = (userId, status) => {
  const rooms = userRooms.get(userId);
  if (rooms) {
    rooms.forEach((roomId) => {
      io.to(roomId).emit("userStatusUpdate", {
        userId,
        status,
        timestamp: new Date().toISOString(),
      });
    });
  }
};

io.on("connection", (socket) => {
  socket.on("addUser", (userId) => {
    if (!userId) return;

    const existing = users.get(userId);
    if (existing && existing.socketId !== socket.id) {
      const oldSocket = io.sockets.sockets.get(existing.socketId);
      if (oldSocket) oldSocket.disconnect(true);
    }

    users.set(userId, {
      socketId: socket.id,
      status: "online",
      lastSeen: new Date().toISOString(),
    });

    socket.userId = userId;
    onlineUsers.add(userId);

    socket.emit("userRegistered", { userId, socketId: socket.id });
    broadcastUserStatus(userId, "online");
  });

  socket.on("updateStatus", (status) => {
    const userId = socket.userId;
    if (!userId) return;

    const validStatuses = ["online", "offline", "away"];
    if (!validStatuses.includes(status)) return;

    const userData = users.get(userId);
    if (userData) {
      userData.status = status;
      userData.lastSeen = new Date().toISOString();
      users.set(userId, userData);
    }

    if (status === "online") onlineUsers.add(userId);
    else onlineUsers.delete(userId);

    broadcastUserStatus(userId, status);
  });

  socket.on("joinRoom", (roomId) => {
    if (!roomId || !socket.userId) return;

    socket.join(roomId);

    if (!userRooms.has(socket.userId)) {
      userRooms.set(socket.userId, new Set());
    }

    userRooms.get(socket.userId).add(roomId);

    socket.to(roomId).emit("userJoinedRoom", {
      userId: socket.userId,
      roomId,
      timestamp: new Date().toISOString(),
    });
  });

  socket.on("leaveRoom", (roomId) => {
    if (!roomId || !socket.userId) return;

    socket.leave(roomId);
    userRooms.get(socket.userId)?.delete(roomId);

    socket.to(roomId).emit("userLeftRoom", {
      userId: socket.userId,
      roomId,
      timestamp: new Date().toISOString(),
    });
  });

  socket.on("sendMessage", async (data) => {
    const { senderId, receiverId, textMessage, roomId, timestamp } = data;

    if (!senderId || !receiverId || !textMessage) {
      return socket.emit("messageError", { error: "Missing required fields" });
    }

    if (socket.userId !== senderId) {
      return socket.emit("messageError", { error: "Unauthorized" });
    }

    const finalRoomId = roomId || [senderId, receiverId].sort().join("-");
    const messageTimestamp = timestamp || new Date().toISOString();

    const completeMessage = {
      senderId,
      receiverId,
      textMessage,
      timestamp: messageTimestamp,
      roomId: finalRoomId,
      messageId: `msg_${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 9)}`,
    };

    try {
      await saveMessage(completeMessage);
    } catch {
      return socket.emit("messageError", { error: "Failed to save message" });
    }

    io.to(finalRoomId).emit("receiveMessage", completeMessage);

    const receiver = users.get(receiverId);
    if (receiver && receiver.socketId !== socket.id) {
      const receiverSocket = io.sockets.sockets.get(receiver.socketId);
      if (receiverSocket && !receiverSocket.rooms.has(finalRoomId)) {
        receiverSocket.emit("receiveMessage", completeMessage);
      }
    }

    socket.emit("messageSent", {
      messageId: completeMessage.messageId,
      timestamp: messageTimestamp,
      status: "delivered",
    });
  });

  socket.on("typing", ({ roomId, isTyping }) => {
    if (!socket.userId || !roomId) return;

    socket.to(roomId).emit("userTyping", {
      userId: socket.userId,
      isTyping,
      timestamp: new Date().toISOString(),
    });
  });
  socket.on("updateStatus", (status) => {
    if (!socket.userId) return;

    const validStatuses = ["online", "offline", "away"];
    if (!validStatuses.includes(status)) {
      return;
    }

    const userData = users.get(socket.userId);
    if (userData) {
      userData.status = status;
      userData.lastSeen = new Date().toISOString();
      users.set(socket.userId, userData);
    }

    if (status === "online") {
      onlineUsers.add(socket.userId);
    } else {
      onlineUsers.delete(socket.userId);
    }

    if (userRooms.has(socket.userId)) {
      userRooms.get(socket.userId).forEach((roomId) => {
        socket.to(roomId).emit("userStatusUpdate", {
          userId: socket.userId,
          status,
          timestamp: new Date().toISOString(),
        });
      });
    }

    broadcastUserStatus(socket.userId, status);
  });

  socket.on("disconnect", () => {
    const userId = socket.userId;
    if (userId) {
      users.delete(userId);
      onlineUsers.delete(userId);

      const rooms = userRooms.get(userId);
      if (rooms) {
        rooms.forEach((roomId) => {
          socket.to(roomId).emit("userStatusUpdate", {
            userId,
            status: "offline",
            timestamp: new Date().toISOString(),
          });
        });
        userRooms.delete(userId);
      }
    }
  });

  socket.on("error", (err) => {
    console.error("Socket error:", err);
  });
});

process.on("SIGTERM", () => {
  server.close(() => {});
});

const port = process.env.PORT_NUMBER || 5000;
server.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
