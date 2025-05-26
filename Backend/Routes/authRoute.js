import express from "express";
import { registerUser } from "../Controllers/registration.js";
const router = express.Router();
router.get("/", async (req, res) => {
  res.send("hello");
});
router.get("/register", registerUser);

export default router;
