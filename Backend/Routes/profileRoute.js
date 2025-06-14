import express from "express";
const router = express.Router();
import isloggedin from "../middelware/isloggedIn.js";
import multer from "multer";
import {
  freelanceProfile,
  freelanceUpdateprofile,
  getfreelanceProfile,
  Usertype,
} from "../controllers/profile.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "profilePics/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

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

export default router;
