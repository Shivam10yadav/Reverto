import mongoose from "mongoose";

const claimSchema = new mongoose.Schema(
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "itemModel",
    },

    itemModel: {
      type: String,
      required: true,
      enum: ["LostItem", "FoundItem"],
    },

    claimantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    score: {
  type: Number,
  default: 0,
},

    answers: {
      description: String,
      uniqueMarks: String,
      insideItems: String,
      extraProof: String,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Claim", claimSchema);