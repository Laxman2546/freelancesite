import userModel from "../models/registrationModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
export const registerUser = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const existedUser = await userModel.findOne({ emailId });
    if (existedUser) {
      console.log("user already exist");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const createUser = await userModel.create({
      emailId,
      password: hashedPassword,
    });
    const token = generateToken(createUser);
    res.cookie("token", token);
    console.log(token);
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
    if (!userData) res.status(401).json({ error: "user not exists" });
    const passwordMatch = bcrypt.compare(password, userData.password);
    if (!passwordMatch)
      res.status(402).json({ error: "email or password error" });
    console.log(userData);
    const token = generateToken(userData);
    console.log(token);
    res.cookie("token", token);
    return res.status(200).json("login succesful");
  } catch (error) {
    return res.status(500).json({ error: "something went wrong", error });
  }
};

export const logoutUser = async (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.status(200).json("suucessfullly logout");
};
