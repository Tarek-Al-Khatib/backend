import { UserModel } from "../models/main.js";

export const userRepository = {
  async findByEmailOrUsername(email, username) {
    return UserModel.findFirst({
      where: { OR: [{ email }, { username }] },
    });
  },

  async createUser(user) {
    return UserModel.create({ data: user });
  },
};
