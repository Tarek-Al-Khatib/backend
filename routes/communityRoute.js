import express from "express";
import {
  getChannels,
  getChats,
  getMembers,
  createCommunity,
  createChannel,
  joinCommunity,
  getUserCommunities,
} from "../controllers/communityController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createCommunity);
router.post("/:communityId/channels", authMiddleware, createChannel);
router.post("/:communityId/join", authMiddleware, joinCommunity);
router.get("/:communityId/channels", authMiddleware, getChannels);
router.get("/:channelId/chats", authMiddleware, getChats);
router.get("/:communityId/members", authMiddleware, getMembers);
router.get("/:userId/communities", authMiddleware, getUserCommunities);

export default router;
