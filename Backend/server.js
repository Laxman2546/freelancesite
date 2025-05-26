import express from "express";
import dotenv from "dotenv";
import authRoute from "./Routes/authRoute.js";

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("hello it's working");
});
app.use("/admin", authRoute);

const port = process.env.PORT_NUMBER;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
