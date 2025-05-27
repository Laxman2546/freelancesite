import jwt from "jsonwebtoken";
const isloggedin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    req.flash("error", "You must be logged in to access this page.");
    return res.redirect("/");
  }
  try {
    const data = jwt.verify(token, process.env.SECRET_KEY);
    req.user = data;
    next();
  } catch (err) {
    console.log("JWT verification failed:", err);
    req.flash("error", "Invalid or expired session. Please log in again.");
    res.redirect("/");
  }
};

export default isloggedin;
