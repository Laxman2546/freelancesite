import mongoose from "mongoose";

const freelancerProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    unique: true,
  },
  skills: {
    type: [String],
    default: [],
  },
  bio: {
    type: String,
    maxlength: 500,
  },
  profilePic: {
    type: String,
    default: "",
  },
  experience: {
    type: Number,
    default: "",
  },
  languagesKnown: {
    type: [String],
  },
  avaliabilty: {
    type: String,
  },
  socialLinks: {
    type: [String],
    default: "",
  },
  job: {
    type: String,
  },
});

export default mongoose.model("freelancerProfile", freelancerProfileSchema);
