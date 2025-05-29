import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    required: true,
  },
  userName: { type: String, trim: true },
  emailId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["client", "freelancer"] },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("user", userSchema);
