import express from "express";
import {
  getMessages,
  sendMessage,
  getUnreadCount,
} from "../controllers/message.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect); 

router.get("/:claimId", getMessages);
router.post("/:claimId", sendMessage);
router.get("/:claimId/unread", getUnreadCount);

export default router;