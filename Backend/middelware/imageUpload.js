import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "profilePics/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});
export const thumbnailStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "thumbnails/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const deleteProfilePicture = async (filename) => {
  if (!filename) return;

  const filePath = path.join(__dirname, "..", "profilePics", filename);
  try {
    await fs.promises.unlink(filePath);
    return true;
  } catch (err) {
    console.error("Failed to delete profile image:", err);
    return false;
  }
};

export const deleteThumbnail = async (filename) => {
  if (!filename) return;

  const filePath = path.join(__dirname, "..", "thumbnail", filename);
  try {
    await fs.promises.unlink(filePath);
    return true;
  } catch (err) {
    console.error("Failed to thumbnail:", err);
    return false;
  }
};
