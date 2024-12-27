import { communityRepository } from "../repositories/communityRepository.js";

export const getChannels = async (req, res) => {
  const communityId = Number(req.params.communityId);

  try {
    await communityRepository.communityExists(communityId);
    const channels = await communityRepository.getChannels(communityId);
    res.status(200).json(channels);
  } catch (error) {
    console.error("Error in getChannels:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getChats = async (req, res) => {
  const channelId = Number(req.params.channelId);

  try {
    await communityRepository.channelExists(channelId);
    const chats = await communityRepository.getChats(channelId);
    res.status(200).json(chats);
  } catch (error) {
    console.error("Error in getChats:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getMembers = async (req, res) => {
  const communityId = Number(req.params.communityId);

  try {
    await communityRepository.communityExists(communityId);
    const members = await communityRepository.getMembers(communityId);
    res.status(200).json(members);
  } catch (error) {
    console.error("Error in getMembers:", error);
    res.status(500).json({ error: error.message });
  }
};
