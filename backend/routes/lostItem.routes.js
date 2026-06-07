import express from "express";
import {
  createLostItem,
  getLostItemById,
  deleteLostItem,
  getLostItems,
} from "../controllers/lostItem.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

// upload.array("images", 4) allows up to 4 images per report
router.post("/", protect, upload.array("images", 4), createLostItem);
router.get("/", getLostItems);
router.get("/:id", getLostItemById);
router.delete("/:id", protect, deleteLostItem);

export default router;