import express from "express";
import {
  getMyDashboard,
  getOwnerDashboard,
  getStats,
} from "../controllers/dashboard.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/me", protect, getMyDashboard);
router.get("/owner", protect, getOwnerDashboard);
router.get("/stats", protect, getStats);

export default router;