import mongoose from "mongoose";

const foundItemSchema = new mongoose.Schema(
  {
    finder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    images: [
      {
        type: String,
      },
    ],

    status: {
      type: String,
      enum: ["found", "claimed", "returned"],
      default: "found",
    },
  },
  { timestamps: true }
);

export default mongoose.model("FoundItem", foundItemSchema);