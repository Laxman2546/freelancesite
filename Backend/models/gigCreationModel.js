import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  priceTitle: { type: String },
  priceFeatures: { type: String },
  deliveryTime: { type: String },
  price: { type: String },
});

const gigCreationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  searchTags: {
    type: [String],
  },
  pricing: {
    basic: { type: packageSchema },
    standard: { type: packageSchema },
    premium: { type: packageSchema },
  },
  description: {
    type: String,
    maxlength: 1000,
  },
  thumbnail: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("gigCreation", gigCreationSchema);
