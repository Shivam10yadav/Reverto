import express from "express";
import {
  createFoundItem,
  getAllFoundItems,
  getFoundItemById,
  deleteFoundItem,
} from "../controllers/foundItem.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createFoundItem);
router.get("/", getAllFoundItems);
router.get("/:id", getFoundItemById);
router.delete("/:id", protect, deleteFoundItem);

export default router;