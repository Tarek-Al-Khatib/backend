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
