import express from "express";
import {
  createClaim,
  getClaimsForOwner,
  getMyClaims,
  verifyClaim,
  getClaimById,
} from "../controllers/claim.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createClaim);
router.get("/owner", protect, getClaimsForOwner);
router.get("/my", protect, getMyClaims);
router.get("/:id", protect, getClaimById);
router.patch("/:id/verify", protect, verifyClaim);

export default router;