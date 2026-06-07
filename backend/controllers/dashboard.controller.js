import LostItem from "../models/lostItem.model.js";
import FoundItem from "../models/foundItem.model.js";
import Claim from "../models/claim.model.js";

export const getMyDashboard = async (req, res) => {
  try {
    const lostItems = await LostItem.find({ owner: req.user._id });

    const foundItems = await FoundItem.find({ finder: req.user._id });

    const myClaims = await Claim.find({ claimantId: req.user._id })
      .populate("itemId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      lostItems,
      foundItems,
      myClaims,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOwnerDashboard = async (req, res) => {
  try {
    const claims = await Claim.find({ ownerId: req.user._id })
      .populate("claimantId", "name email")
      .populate("itemId")
      .sort({ createdAt: -1 });

    const pendingClaims = claims.filter((c) => c.status === "pending");
    const approvedClaims = claims.filter((c) => c.status === "approved");
    const rejectedClaims = claims.filter((c) => c.status === "rejected");

    res.status(200).json({
      totalClaims: claims.length,
      pendingClaims,
      approvedClaims,
      rejectedClaims,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getStats = async (req, res) => {
  try {
    const totalLost = await LostItem.countDocuments();
    const totalFound = await FoundItem.countDocuments();
    const totalClaims = await Claim.countDocuments();
    const approved = await Claim.countDocuments({ status: "approved" });

    res.status(200).json({
      totalLost,
      totalFound,
      totalClaims,
      approved,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 