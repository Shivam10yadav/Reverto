import express from "express";
import {
  createFoundItem,
  getFoundItemById,
  deleteFoundItem,
  getFoundItems,
} from "../controllers/foundItem.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

// upload.array("images", 4) allows up to 4 images per report
router.post("/", protect, upload.array("images", 4), createFoundItem);
router.get("/", getFoundItems);
router.get("/:id", getFoundItemById);
router.delete("/:id", protect, deleteFoundItem);

export default router;