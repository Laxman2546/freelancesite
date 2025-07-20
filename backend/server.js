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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/profilePics", express.static(path.join(__dirname, "profilePics")));
app.use("/thumbnails", express.static(path.join(__dirname, "thumbnails")));
app.use(cookieParser());
dotenv.config();
connectDB();
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

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
