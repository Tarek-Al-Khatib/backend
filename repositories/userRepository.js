import { UserModel } from "../models/main.js";
import { fullUrl } from "../utils/getFullURL.js";

export const userRepository = {
  async findByEmailOrUsername(email, username) {
    return UserModel.findFirst({
      where: { OR: [{ email }, { username }] },
    });
  },

  async createUser(user, req) {
    const url = fullUrl(req);
    console.log(url);
    return UserModel.create({
      data: {
        ...user,
        profile_pic: `${url}/uploads/default-avatar.jpg`,
      },
    });
  },

  async findById(userId) {
    return UserModel.findFirstOrThrow({
      where: {
        id: userId,
      },
    });
  },
};
