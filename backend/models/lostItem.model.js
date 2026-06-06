import mongoose from "mongoose";

const lostItemSchema = new mongoose.Schema(
  {
    owner: {
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

    reward: {
      type: Number,
      default: 0,
    },

    images: [
      {
        type: String,
      },
    ],

    status: {
      type: String,
      enum: ["lost", "claimed", "returned"],
      default: "lost",
    },
  },
  { timestamps: true }
);

export default mongoose.model("LostItem", lostItemSchema);