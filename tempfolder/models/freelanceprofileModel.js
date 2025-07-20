import mongoose from "mongoose";

const freelancerProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    unique: true,
  },
  skills: {
    type: [],
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
    type: [],
  },
  avaliability: {
    type: String,
  },
  socialLinks: {
    type: [],
    default: "",
  },
  job: {
    type: String,
  },
  mobilenumber: {
    type: Number,
  },
});

export default mongoose.model("freelancerProfile", freelancerProfileSchema);
