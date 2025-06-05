import freelanceprofileModel from "../models/freelanceprofileModel.js";
import userModel from "../models/registrationModel.js";
export const freelanceProfile = async (req, res) => {
  const {
    bio,
    skills,
    socialLinks,
    experience,
    avaliability,
    languagesKnown,
    certifications,
    education,
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
      certifications,
      education,
    });
    return res.status(200).json("your data created suceesfully", createProfile);
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
    languagesKnown,
    certifications,
    education,
  } = req.body;
  try {
    const { userId } = req.user;
    const fetchUser = await userModel.findOne({ userId });
    if (!fetchUser) return res.status(500).json({ error: "user not found" });
    const createProfile = await freelanceprofileModel.findOneAndUpdate(
      { userId },
      {
        bio,
        skills,
        socialLinks,
        experience,
        avaliability,
        languagesKnown,
        certifications,
        education,
      },
      { new: true, upsert: true }
    );
    return res.status(200).json("your data updated suceesfully", createProfile);
  } catch (e) {
    return res.status(500).json({ error: "something went wrong" });
  }
};
export const getfreelanceProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    console.log(req.user);
    const fetchUser = await userModel.findOne({ userId });
    if (!fetchUser) return res.status(500).json({ error: "user not found" });
    const fetchUserProfile = await freelanceprofileModel.findOne({ userId });
    if (!fetchUserProfile)
      return res.status(500).json({ error: "user not found" });
    return res
      .status(200)
      .json({ success: "user Found", fetchUser, fetchUserProfile });
  } catch (e) {
    return res
      .status(500)
      .json(
        { error: "something went wrong", e },
        console.log(e, "this is error")
      );
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
