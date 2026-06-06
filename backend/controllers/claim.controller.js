import Claim from "../models/claim.model.js";
import LostItem from "../models/lostItem.model.js";
import FoundItem from "../models/foundItem.model.js";
import { calculateScore } from "../utils/claimScore.js";

export const createClaim = async (req, res) => {
  try {
    const { itemId, itemModel, answers } = req.body;

    let item;

    if (itemModel === "LostItem") {
      item = await LostItem.findById(itemId);
    } else if (itemModel === "FoundItem") {
      item = await FoundItem.findById(itemId);
    }

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    const claim = await Claim.create({
      itemId,
      itemModel,
      claimantId: req.user._id,
      ownerId: item.owner || item.finder,
      answers,
      status: "pending",
      score: 0,
    });

    res.status(201).json(claim);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getClaimsForOwner = async (req, res) => {
  try {
    const claims = await Claim.find({ ownerId: req.user._id })
      .populate("claimantId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(claims);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyClaims = async (req, res) => {
  try {
    const claims = await Claim.find({ claimantId: req.user._id })
      .populate("ownerId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(claims);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const verifyClaim = async (req, res) => {
  try {
    const { action } = req.body; 
    // action = "approve" | "reject"

    const claim = await Claim.findById(req.params.id);

    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    if (claim.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Get item
    let item;
    if (claim.itemModel === "LostItem") {
      item = await LostItem.findById(claim.itemId);
    } else {
      item = await FoundItem.findById(claim.itemId);
    }

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Calculate verification score
    const score = calculateScore(item, claim);
    claim.score = score;

    // Decision logic
    if (action === "approve") {
      if (score >= 70) {
        claim.status = "approved";
      } else {
        return res.status(400).json({
          message: "Claim not strong enough to approve",
          score,
        });
      }
    }

    if (action === "reject") {
      claim.status = "rejected";
    }

    await claim.save();

    res.status(200).json({
      message: "Claim updated successfully",
      claim,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getClaimById = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id)
      .populate("claimantId", "name email")
      .populate("ownerId", "name email");

    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    res.status(200).json(claim);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};