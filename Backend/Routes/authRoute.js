import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/registration.js";
const router = express.Router();
router.post("/create", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
