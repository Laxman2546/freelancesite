import express from "express";
const router = express.Router();
import isloggedin from "../middelware/isloggedIn.js";
import {
  freelanceProfile,
  freelanceUpdateprofile,
  getfreelanceProfile,
  Usertype,
} from "../controllers/profile.js";
router.get("/", isloggedin, getfreelanceProfile);
router.post("/usertype", isloggedin, Usertype);
router.post("/freelanceProfile", isloggedin, freelanceProfile);
router.post("/update", isloggedin, freelanceUpdateprofile);

export default router;
