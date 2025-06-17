import freelanceprofileModel from "../models/freelanceprofileModel.js";
import userModel from "../models/registrationModel.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const deleteProfilePicture = async (filename) => {
  if (!filename) return;

  const filePath = path.join(__dirname, "..", "profilePics", filename);
  try {
    await fs.promises.unlink(filePath);
    console.log("Profile image deleted successfully");
    return true;
  } catch (err) {
    console.error("Failed to delete profile image:", err);
    return false;
  }
};

export const freelanceProfile = async (req, res) => {
  const {
    bio,
    skills,
    socialLinks,
    experience,
    avaliability,
    languagesKnown,
    mobilenumber,
    job,
  } = req.body;
  try {
    const { userId } = req.user;
    const fetchUser = await userModel.findOne({ userId });
    if (!fetchUser) return res.status(500).json({ error: "user not found" });
    const createProfile = await freelanceprofileModel.create({
      bio,
      skills,
      socialLinks,
      experience,
      avaliability,
      languagesKnown,
      mobilenumber,
      profilePic: req.file?.filename,
      job,
    });
    return res
      .status(200)
      .json("your data created suceesfully", createProfile, fetchUser);
  } catch (e) {
    return res.status(500).json({ error: "something went wrong" });
  }
};
export const freelanceUpdateprofile = async (req, res) => {
  const {
    bio,
    skills,
    socialLinks,
    experience,
    avaliability,
    mobilenumber,
    languagesKnown,
    job,
  } = req.body;
  try {
    const { userId } = req.user;
    const fetchUser = await userModel.findOne({ userId });
    if (!fetchUser) return res.status(500).json({ error: "user not found" });

    const parsedSkills = JSON.parse(skills || "[]");
    const parsedSocialLinks = JSON.parse(socialLinks || "[]");
    const parsedLanguagesKnown = JSON.parse(languagesKnown || "[]");

    const existingProfile = await freelanceprofileModel.findOne({ userId });

    if (req.file?.filename && existingProfile?.profilePic) {
      await deleteProfilePicture(existingProfile.profilePic);
    }

    const createProfile = await freelanceprofileModel.findOneAndUpdate(
      { userId },
      {
        bio,
        skills: parsedSkills,
        socialLinks: parsedSocialLinks,
        experience,
        mobilenumber,
        avaliability,
        languagesKnown: parsedLanguagesKnown,
        profilePic: req.file?.filename,
        job,
      },
      { new: true, upsert: true }
    );
    return res.status(200).json({
      message: "your data updated successfully",
      profile: createProfile,
      user: fetchUser,
    });
  } catch (e) {
    console.error("Profile update error:", e);
    return res.status(500).json({ error: "something went wrong" });
  }
};
export const getfreelanceProfile = async (req, res) => {
  try {
    const { userId } = req.user;

    if (!userId) {
      return res.status(400).json({ error: "Invalid user ID in token" });
    }

    const fetchUser = await userModel.findOne({ userId });
    if (!fetchUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const fetchUserProfile = await freelanceprofileModel.findOne({ userId });
    if (!fetchUserProfile) {
      return res.status(200).json({
        success: true,
        fetchUser: fetchUser,
        message: "Add Your profile photo",
      });
    }
    return res.status(200).json({
      success: true,
      fetchUser: fetchUser,
      profile: fetchUserProfile,
    });
  } catch (e) {
    console.error("Profile fetch error:", e);
    return res.status(500).json({
      error: "Internal server error",
      message: e.message,
    });
  }
};
export const Usertype = async (req, res) => {
  try {
    const { userId } = req.user;
    const { role } = req.body;
    const fetchUser = await userModel.findOne({ userId });
    if (!fetchUser) return res.status(500).json({ error: "user not found" });
    const userType = await userModel.findOneAndUpdate(
      {
        userId,
      },
      { role }
    );
    return res.status(200).json({ success: "setted user type", userType });
  } catch (e) {
    return res
      .status(500)
      .json(
        { error: "something went wrong", e },
        console.log(e, "this is error")
      );
  }
};
export const removeAccount = async (req, res) => {
  try {
    const { userId } = req.user;

    const deletedUser = await userModel.findOneAndDelete({ userId });

    if (!deletedUser) {
      return res
        .status(404)
        .json({ error: "User not found. Please login again." });
    }

    const deletedProfile = await freelanceprofileModel.findOneAndDelete({
      userId,
    });

    if (!deletedProfile) {
      return res.status(200).json({
        success: true,
        user: deletedUser,
        message: "User deleted, but profile was not found.",
      });
    }

    if (deletedProfile?.profilePic) {
      await deleteProfilePicture(deletedProfile.profilePic);
    }

    return res.status(200).json({
      success: true,
      user: deletedUser,
      profile: deletedProfile,
      message: "User and profile deleted successfully.",
    });
  } catch (error) {
    console.error("An error occurred while deleting the account:", error);
    return res
      .status(500)
      .json({ error: "Internal server error. Please try again later." });
  }
};
