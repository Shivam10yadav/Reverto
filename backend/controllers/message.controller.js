import Message from "../models/Message.model.js";
import Claim from "../models/claim.model.js";

// ─── helpers 

// Verify the requesting user is part of this claim and claim is approved
const verifyAccess = async (claimId, userId) => {
  const claim = await Claim.findById(claimId);
  if (!claim) return { error: "Claim not found.", status: 404 };
  if (claim.status !== "approved") {
    return { error: "Chat is only available for approved claims.", status: 403 };
  }
  const isOwner = claim.ownerId.toString() === userId.toString();
  const isClaimant = claim.claimantId.toString() === userId.toString();
  if (!isOwner && !isClaimant) {
    return { error: "Not authorized.", status: 403 };
  }
  return { claim };
};

// ─── GET /messages/:claimId 

export const getMessages = async (req, res) => {
  try {
    const { claimId } = req.params;

    const { error, status } = await verifyAccess(claimId, req.user._id);
    if (error) return res.status(status).json({ message: error });

    const messages = await Message.find({ claimId })
      .populate("senderId", "name")
      .sort({ createdAt: 1 });

    await Message.updateMany(
      { claimId, receiverId: req.user._id, read: false },
      { read: true }
    );

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── POST /messages/:claimId


export const sendMessage = async (req, res) => {
  try {
    const { claimId } = req.params;
    const { text } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({ message: "Message text is required." });
    }

    const { error, status, claim } = await verifyAccess(claimId, req.user._id);
    if (error) return res.status(status).json({ message: error });

    // Figure out who the receiver is
    const receiverId =
      claim.ownerId.toString() === req.user._id.toString()
        ? claim.claimantId
        : claim.ownerId;

    const message = await Message.create({
      claimId,
      senderId: req.user._id,
      receiverId,
      text: text.trim(),
    });

    const populated = await message.populate("senderId", "name");

    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const getUnreadCount = async (req, res) => {
  try {
    const { claimId } = req.params;
    const count = await Message.countDocuments({
      claimId,
      receiverId: req.user._id,
      read: false,
    });
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};