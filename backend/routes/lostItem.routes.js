import express from "express";
import {
  createLostItem,
  getAllLostItems,
  getLostItemById,
  deleteLostItem,
} from "../controllers/lostItem.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createLostItem);
router.get("/", getAllLostItems);
router.get("/:id", getLostItemById);
router.delete("/:id", protect, deleteLostItem);

export default router;