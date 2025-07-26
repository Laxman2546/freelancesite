import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    gigId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "gigCreation",
      required: true,
    },
    freelancerId: {
      type: String,
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "in progress",
        "delivered",
        "revision requested",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },
    requirements: {
      type: String,
      default: "",
    },
    progressUpdates: [
      {
        message: String,
        fileUrl: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    delivery: {
      files: [String],
      message: String,
      deliveredAt: Date,
    },
    review: {
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      comment: String,
      reviewedAt: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
