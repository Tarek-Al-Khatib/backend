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
};
