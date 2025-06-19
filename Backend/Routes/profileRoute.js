import express from "express";
const router = express.Router();
import isloggedin from "../middelware/isloggedIn.js";
import multer from "multer";
import { storage } from "../middelware/imageUpload.js";
import {
  freelanceProfile,
  freelanceUpdateprofile,
  getfreelanceProfile,
  Usertype,
  removeAccount,
} from "../controllers/profile.js";

const upload = multer({ storage });

router.get("/", isloggedin, getfreelanceProfile);
router.post("/usertype", isloggedin, Usertype);
router.post(
  "/freelanceProfile",
  isloggedin,
  upload.single("profilePic"),
  freelanceProfile
);
router.post(
  "/update",
  isloggedin,
  upload.single("profilePic"),
  freelanceUpdateprofile
);
router.post("/removeaccount", isloggedin, removeAccount);
export default router;
