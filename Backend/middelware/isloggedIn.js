import jwt from "jsonwebtoken";
const isloggedin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ error: "Something went wrong! please login again" });
  }
  try {
    const data = jwt.verify(token, process.env.SECRET_KEY);
    req.user = data;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: "Something went wrong! please login again" });
  }
};

export default isloggedin;
