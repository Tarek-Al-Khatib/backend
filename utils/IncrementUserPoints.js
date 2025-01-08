import { UserModel } from "../models/main";

export const incrementUserPoints = async (userId, points) => {
  try {
    await UserModel.update({
      data: {
        points: { increment: points },
      },
      where: {
        id: userId,
      },
    });
  } catch (error) {
    console.log(error);
    return false;
  }

  return true;
};
