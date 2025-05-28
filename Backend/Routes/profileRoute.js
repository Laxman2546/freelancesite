import express from "express";
const router = express.Router();
import isloggedin from "../middelware/isloggedIn.js";
import {
  freelanceProfile,
  freelanceUpdateprofile,
  getfreelanceProfile,
} from "../controllers/profile.js";
router.post("/", isloggedin, getfreelanceProfile);
router.post("/freelanceProfile", isloggedin, freelanceProfile);
router.post("/update", isloggedin, freelanceUpdateprofile);

export default router;
