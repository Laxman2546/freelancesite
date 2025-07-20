import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connection = mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("mongodb connected"))
  .catch(() => console.log("error in the connection"));

export default connection;
