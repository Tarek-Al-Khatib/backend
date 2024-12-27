import {
  ChatModel,
  CommunityMemberModel,
  CommunityChannelModel,
  CommunityModel,
} from "../models/main.js";

export const communityRepository = {
  async getChannels(communityId) {
    return CommunityChannelModel.findMany({
      where: { community_id: communityId },
      include: {
        creator: true,
      },
    });
  },

  async getChats(channelId) {
    return ChatModel.findMany({
      where: {
        channel_id: channelId,
      },
      include: {
        sender: true,
        channel: true,
      },
    });
  },

  async createCommunity(userId, communityData) {
    const community = await CommunityModel.create({
      data: {
        ...communityData,
        creator_id: userId,
      },
    });

    return community;
  },

  async createChannel(userId, channelData) {
    const channel = await CommunityChannelModel.create({
      data: {
        ...channelData,
        creator_id: userId,
      },
    });

    return channel;
  },

  async getMembers(communityId) {
    return CommunityMemberModel.findMany({
      where: { community_id: communityId },
      include: {
        user: true,
      },
    });
  },

  async communityExists(communityId) {
    try {
      await CommunityModel.findFirstOrThrow({
        where: { id: communityId },
      });
      return true;
    } catch (error) {
      throw new Error(`Community with ID ${communityId} does not exist.`);
    }
  },

  async channelExists(channelId) {
    try {
      await CommunityChannelModel.findFirstOrThrow({
        where: { id: channelId },
      });
      return true;
    } catch (error) {
      throw new Error(`Channel with ID ${channelId} does not exist.`);
    }
  },
};
