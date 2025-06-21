import userModel from "../models/registrationModel.js";

export const getUserData = async (userId) => {
  const isUser = await userModel.findOne({userId});
  return isUser;
};
