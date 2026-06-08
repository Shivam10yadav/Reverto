import Claim from "../models/claim.model.js";
import LostItem from "../models/lostItem.model.js";
import FoundItem from "../models/foundItem.model.js";
import { calculateScore } from "../utils/claimScore.js";

// ─── helpers 

const getItem = async (itemId, itemModel) => {
  if (itemModel === "LostItem") return await LostItem.findById(itemId);
  if (itemModel === "FoundItem") return await FoundItem.findById(itemId);
  return null;
};

// ─── POST /claims 

export const createClaim = async (req, res) => {
  try {
    const { itemId, itemModel, answers } = req.body;

    if (!itemId || !itemModel || !answers) {
      return res.status(400).json({ message: "itemId, itemModel and answers are required." });
    }

    const item = await getItem(itemId, itemModel);
    if (!item) return res.status(404).json({ message: "Item not found." });

    const ownerId = item.owner || item.finder;
    if (ownerId.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "You cannot claim your own item." });
    }

    const existing = await Claim.findOne({
      itemId,
      claimantId: req.user._id,
    });
    if (existing) {
      return res.status(400).json({ message: "You have already submitted a claim for this item." });
    }

    const score = calculateScore(item, { answers });

    const claim = await Claim.create({
      itemId,
      itemModel,
      claimantId: req.user._id,
      ownerId,
      answers,
      score,
      status: "pending",
    });

    res.status(201).json({ message: "Claim submitted successfully.", claim });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── GET /claims/owner ────────────────────────────────────────────────────────
// Owner/finder sees all claims on their items

export const getClaimsForOwner = async (req, res) => {
  try {
    const claims = await Claim.find({ ownerId: req.user._id })
      .populate("claimantId", "name email")
      .populate("itemId")          // so frontend can show item title/image
      .sort({ createdAt: -1 });

    res.status(200).json(claims);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── GET /claims/mine 

export const getMyClaims = async (req, res) => {
  try {
    const claims = await Claim.find({ claimantId: req.user._id })
      .populate("ownerId", "name email")
      .populate("itemId")          // so frontend can show item title/image/location
      .sort({ createdAt: -1 });

    res.status(200).json(claims);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const verifyClaim = async (req, res) => {
  try {
    const { action } = req.body;

    if (!["approve", "reject"].includes(action)) {
      return res.status(400).json({ message: 'action must be "approve" or "reject".' });
    }

    const claim = await Claim.findById(req.params.id);
    if (!claim) return res.status(404).json({ message: "Claim not found." });

    if (claim.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized." });
    }

    if (claim.status !== "pending") {
      return res.status(400).json({ message: `Claim is already ${claim.status}.` });
    }

    const item = await getItem(claim.itemId, claim.itemModel);
    if (item) {
      claim.score = calculateScore(item, claim);
    }

    if (action === "approve") {
      if (claim.score < 50 && !req.body.force) {
        return res.status(400).json({
          message: "Score too low to auto-approve. Send force: true to approve anyway.",
          score: claim.score,
          requiresForce: true,
        });
      }
      claim.status = "approved";

      if (item) {
        item.status = "claimed";
        await item.save();
      }
    }

    if (action === "reject") {
      claim.status = "rejected";
    }

    await claim.save();

    const populated = await claim.populate([
      { path: "claimantId", select: "name email" },
      { path: "ownerId", select: "name email" },
      { path: "itemId" },
    ]);

    res.status(200).json({
      message: `Claim ${claim.status} successfully.`,
      claim: populated,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── GET /claims/:id 
// Get single claim detail (used when owner clicks a claim to review)

export const getClaimById = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id)
      .populate("claimantId", "name email")
      .populate("ownerId", "name email")
      .populate("itemId");

    if (!claim) return res.status(404).json({ message: "Claim not found." });

    const isOwner = claim.ownerId._id.toString() === req.user._id.toString();
    const isClaimant = claim.claimantId._id.toString() === req.user._id.toString();
    if (!isOwner && !isClaimant) {
      return res.status(403).json({ message: "Not authorized." });
    }

    res.status(200).json(claim);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};