import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import profileRoute from "./routes/profileRoute.js";
import cors from "cors";
import db from "./Config/mongooseConnection.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/", authRoute);
app.use("/profile", profileRoute);

const port = process.env.PORT_NUMBER;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
