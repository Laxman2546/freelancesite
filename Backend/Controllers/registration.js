import userModel from "../models/registrationModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import mongoose from "mongoose";
export const registerUser = async (req, res) => {
  try {
    const { emailId, password, userName } = req.body;
    const existedUser = await userModel.findOne({ emailId });
    if (existedUser) {
      return res.status(400).json({ error: "Emailid already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const createUser = await userModel.create({
      userId: new mongoose.Types.ObjectId(),
      emailId,
      userName,
      password: hashedPassword,
    });
    const token = generateToken(createUser);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ success: "user logged in" });

    return res.status(200).json(createUser);
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  const { emailId, password } = req.body;
  try {
    const userData = await userModel.findOne({ emailId });
    if (!userData) {
      return res.status(400).json({ error: "user not exists" });
    }

    const passwordMatch = await bcrypt.compare(password, userData.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "email or password wrong" });
    }

    const token = generateToken(userData);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "login successful" });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", { expires: new Date(0) });
    return res.status(201).json("sucessfully logout");
  } catch (e) {
    return res.status(500).json({ error: "internal server error,try again!" });
  }
};
