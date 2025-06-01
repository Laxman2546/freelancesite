import freelanceModel from "../models/freelanceModel.js";
import userModel from "../models/registrationModel.js";
export const freelanceProfile = async (req, res) => {
  const { bio, skills, portfolioLinks, experience } = req.body;
  try {
    const { userId } = req.user;
    const fetchUser = await userModel.findOne({ userId });
    if (!fetchUser) return res.status(500).json({ error: "user not found" });
    const createProfile = await freelanceModel.create({
      bio,
      skills,
      portfolioLinks,
      experience,
    });
    return res.status(200).json("your data created suceesfully", createProfile);
  } catch (e) {
    return res.status(500).json({ error: "something went wrong" });
  }
};
export const freelanceUpdateprofile = async (req, res) => {
  const { bio, skills, portfolioLinks, experience } = req.body;
  try {
    const { userId } = req.user;
    const fetchUser = await userModel.findOne({ userId });
    if (!fetchUser) return res.status(500).json({ error: "user not found" });
    const createProfile = await freelanceModel.findOneAndUpdate(
      { userId },
      {
        bio,
        skills,
        portfolioLinks,
        experience,
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
    return res.status(200).json({ success: "user Found", fetchUser });
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
