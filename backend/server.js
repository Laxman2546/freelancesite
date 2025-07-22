import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import profileRoute from "./routes/profileRoute.js";
import gigRoute from "./routes/gigRoute.js";
import cors from "cors";
import connectDB from "./config/mongooseConnection.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import http from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const server = http.createServer(app);
const users = new Map();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/profilePics", express.static(path.join(__dirname, "profilePics")));
app.use("/thumbnails", express.static(path.join(__dirname, "thumbnails")));
app.use(cookieParser());
dotenv.config();
connectDB();

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://gigconnect.vercel.app",
      "http://192.168.0.108:5173",
      process.env.FRONTEND_URL,
    ].filter(Boolean),
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.on("connect", (userId) => {
    console.log(`connected with userId: ${userId}`);
    io.emit("message", text);
  });
  socket.on("join", (userId) => {
    users.set(socket.id, userId);
    socket.userId = userId;
    console.log(`User joined with userId: ${userId}`);
  });

  socket.on("sendMessage", ({ text, senderId, receiverId }) => {
    console.log(`this message is from ${senderId} to ${receiverId} as ${text}`);
    const receiverSocketId = users.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", {
        senderId,
        text,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    users.delete(socket.id);
  });
});

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://gigconnect.vercel.app",
      "http://192.168.0.108:5173",
      process.env.FRONTEND_URL,
    ].filter(Boolean),
    credentials: true,
  })
);
app.use("/", authRoute);
app.use("/profile", profileRoute);
app.use("/gig", gigRoute);

const port = process.env.PORT_NUMBER;

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
