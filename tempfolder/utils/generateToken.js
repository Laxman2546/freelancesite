import jwt from "jsonwebtoken";

const generateToken = (user) => {
  try {
    const token = jwt.sign(
      { emailId: user.emailId, userId: user.userId },
      process.env.SECRET_KEY
    );
    console.log("Token generated", token);
    return token;
  } catch (e) {
    throw new Error("Token generation failed");
  }
};

export default generateToken;
