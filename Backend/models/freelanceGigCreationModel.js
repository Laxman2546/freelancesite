import mongoose from "mongoose";

const freelancerJobSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  gigTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxlength: 1000,
  },
  skillsRequired: {
    type: [String],
  },
  price: {
    type: Number,
    required: true,
  },
  deliveryTime: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
  category: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("freelancerJob", freelancerJobSchema);
