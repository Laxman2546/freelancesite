import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
  },
  userName: {
    type: String,
  },
  emailId: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["client", "freelancer"],
  },
  skills: [String],
});
export default mongoose.model("user", userSchema);
