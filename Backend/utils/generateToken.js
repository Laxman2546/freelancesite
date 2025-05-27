import jwt from "jsonwebtoken";

const generateToken = (user, req, res) => {
  try {
    const token = jwt.sign(
      { emailId: user.emaiId, userId: user._id },
      process.env.SECRET_KEY
    );
    return token;
  } catch (e) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

export default generateToken;
