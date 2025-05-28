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
  reviews: [
    {
      from: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      comment: String,
      rating: Number,
    },
  ],
  experience: {
    type: String,
    default: "",
  },
  portfolioLinks: [String],
});

export default mongoose.model("freelancerProfile", freelancerProfileSchema);
