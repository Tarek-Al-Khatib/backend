import express from "express";
import {
  getChannels,
  getChats,
  getMembers,
} from "../controllers/communityController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:communityId/channels", authMiddleware, getChannels);
router.get("/:channelId/chats", authMiddleware, getChats);
router.get("/:communityId/members", authMiddleware, getMembers);

export default router;
