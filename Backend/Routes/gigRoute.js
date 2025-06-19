import express from "express";
import isloggedin from "../middelware/isloggedIn.js";
import { thumbnailStorage } from "../middelware/imageUpload.js";
import multer from "multer";
import {
  deletegigPost,
  getgigPost,
  gigPost,
  updategigPost,
} from "../controllers/gig.js";

const router = express.Router();
const upload = multer({ thumbnailStorage });

router.post("/post", isloggedin, upload.single("thumbnail"), gigPost);
router.post("/update", isloggedin, updategigPost);
router.delete("/delete", isloggedin, deletegigPost);
router.get("/get", isloggedin, getgigPost);

export default router;
