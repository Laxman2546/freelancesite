import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, trim: true },
  emailId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["client", "freelancer"], required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("user", userSchema);
