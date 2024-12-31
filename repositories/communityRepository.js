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
        chats: true,
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

    await this.joinCommunity(userId, community.id, "ADMIN");

    return community;
  },

  async createChannel(userId, channelData) {
    const channel = await CommunityChannelModel.create({
      data: {
        ...channelData,
        creator_id: userId,
      },
      include: {
        creator: true,
      },
    });

    return channel;
  },

  async joinCommunity(userId, communityId, role = "USER") {
    const joinedCommunity = await CommunityMemberModel.create({
      data: {
        user_id: userId,
        community_id: communityId,
        role,
      },
    });
    return joinedCommunity;
  },

  async getUserCommunities(userId) {
    try {
      const communities = await CommunityMemberModel.findMany({
        where: {
          user_id: userId,
        },
        include: {
          community: true,
        },
      });
      return communities.map((membership) => membership.community);
    } catch (error) {
      console.error("Error in getUserCommunities:", error);
      throw new Error("Failed to fetch user communities.");
    }
  },

  async getMembers(communityId) {
    return CommunityMemberModel.findMany({
      where: { community_id: communityId },
      include: {
        user: true,
      },
    });
  },

  async saveMessage(channelId, userId, message) {
    return ChatModel.create({
      data: {
        message: message,
        sender_id: userId,
        channel_id: channelId,
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
