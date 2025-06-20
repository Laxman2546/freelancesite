import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "..", "profilePics");
    ensureDirectoryExists(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

export const thumbnailStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "..", "thumbnails");
    ensureDirectoryExists(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});


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

  const filePath = path.join(__dirname, "..", "thumbnails", filename);
  try {
    await fs.promises.unlink(filePath);
    return true;
  } catch (err) {
    console.error("Failed to delete thumbnail:", err);
    return false;
  }
};
