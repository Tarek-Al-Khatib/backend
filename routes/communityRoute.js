import express from "express";
import {
  getChannels,
  getChats,
  getMembers,
  createCommunity,
  createChannel,
  joinCommunity,
  getUserCommunities,
  getTopCommunities,
} from "../controllers/communityController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  upload.fields([
    { name: "community_logo", maxCount: 1 },
    { name: "community_banner", maxCount: 1 },
  ]),
  createCommunity
);
router.post("/:communityId/channels", authMiddleware, createChannel);
router.post("/:communityId/join", authMiddleware, joinCommunity);
router.get("/:communityId/channels", authMiddleware, getChannels);
router.get("/:channelId/chats", authMiddleware, getChats);
router.get("/:communityId/members", authMiddleware, getMembers);
router.get("/:userId/communities", authMiddleware, getUserCommunities);
router.get("/top", getTopCommunities);

export default router;
