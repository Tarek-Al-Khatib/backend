import {
  ChatModel,
  CommunityMemberModel,
  CommunityChannelModel,
  CommunityModel,
} from "../models/main.js";
import { fullUrl } from "../utils/getFullURL.js";

export const communityRepository = {
  async getChannels(communityId) {
    return CommunityChannelModel.findMany({
      where: { community_id: communityId },
      include: {
        creator: true,
        chats: {
          include: {
            sender: true,
          },
        },
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

  async createCommunity(userId, communityData, req) {
    const url = fullUrl(req);
    const community = await CommunityModel.create({
      data: {
        ...communityData,
        creator_id: userId,
      },
    });
    if (community.community_logo) {
      community.community_logo = `${url}${community.community_logo}`;
    }
    if (community.community_banner) {
      community.community_banner = `${url}${community.community_banner}`;
    }

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
        chats: true,
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

  async getUserCommunities(userId, req) {
    try {
      const url = fullUrl(req);
      const communities = await CommunityMemberModel.findMany({
        where: {
          user_id: userId,
        },
        include: {
          community: true,
        },
      });
      return communities.map((membership) => {
        const community = membership.community;
        if (community.community_logo) {
          community.community_logo = `${url}${community.community_logo}`;
        }
        if (community.community_banner) {
          community.community_banner = `${url}${community.community_banner}`;
        }

        return community;
      });
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

  async saveMessage(channelId, userId, messageContent) {
    console.log(messageContent);
    return ChatModel.create({
      data: {
        message: messageContent,
        sender_id: userId,
        channel_id: channelId,
      },
      include: { sender: true },
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

  async getTopCommunities(req, userId) {
    try {
      const url = fullUrl(req);
      const topCommunities = await CommunityModel.findMany({
        where: {
          members: {
            none: {
              user_id: userId,
            },
          },
        },
        take: 6,
        orderBy: {
          members: {
            _count: "desc",
          },
        },
        include: {
          members: true,
        },
      });
      return topCommunities.map((community) => {
        if (community.community_logo) {
          community.community_logo = `${url}${community.community_logo}`;
        }
        if (community.community_banner) {
          community.community_banner = `${url}${community.community_banner}`;
        }

        return community;
      });
    } catch (error) {
      console.error("Error in getUserCommunities:", error);
      throw new Error("Failed to fetch user communities.");
    }
  },

  async isUserInCommunity(userId, communityId) {
    try {
      const joined = await CommunityMemberModel.findFirst({
        where: {
          user_id: userId,
          community_id: communityId,
        },
      });

      return joined;
    } catch (error) {
      console.log(error);
    }
  },
};
