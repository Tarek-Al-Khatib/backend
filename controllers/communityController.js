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

export const createCommunity = async (req, res) => {
  const userId = Number(req.params.userId);
  const { title, description } = req.body;
  const { community_logo, community_banner } = req.files;
  const logoPath = community_logo
    ? `/uploads/${community_logo[0].filename}`
    : null;
  const bannerPath = community_banner
    ? `/uploads/${community_banner[0].filename}`
    : null;

  const newCommunityData = {
    title,
    description,
    community_logo: logoPath,
    community_banner: bannerPath,
  };
  try {
    const community = await communityRepository.createCommunity(
      userId,
      newCommunityData,
      req
    );
    res.status(200).json(community);
  } catch (error) {
    console.error("Error in createCommunity:", error);
    res.status(500).json({ error: error.message });
  }
};

export const createChannel = async (req, res) => {
  const userId = Number(req.params.userId);
  const communityId = Number(req.params.communityId);

  const channelData = {
    ...req.body,
    community_id: communityId,
  };

  try {
    await communityRepository.communityExists(communityId);

    const channel = await communityRepository.createChannel(
      userId,
      channelData
    );
    res.status(200).json(channel);
  } catch (error) {
    console.error("Error in createChannel:", error);
    res.status(500).json({ error: error.message });
  }
};

export const joinCommunity = async (req, res) => {
  const userId = Number(req.params.userId);
  const communityId = Number(req.params.communityId);
  const role = req.body.role || "USER";

  try {
    await communityRepository.communityExists(communityId);

    const joined = await communityRepository.isUserInCommunity(
      userId,
      communityId
    );

    if (joined !== null) {
      const communityMember = await communityRepository.joinCommunity(
        userId,
        communityId,
        role
      );
      res.status(200).json(communityMember);
    }
    res.status(200).json({ message: "Already in community" });
  } catch (error) {
    console.error("Error in joinCommunity:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getUserCommunities = async (req, res) => {
  const userId = Number(req.params.userId);

  try {
    const communities = await communityRepository.getUserCommunities(
      userId,
      req
    );
    res.status(200).json(communities);
  } catch (error) {
    console.error("Error in getUserCommunities:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getTopCommunities = async (req, res) => {
  try {
    const communities = await communityRepository.getTopCommunities(req);
    res.status(200).json(communities);
  } catch (error) {
    console.log(error);
  }
};
