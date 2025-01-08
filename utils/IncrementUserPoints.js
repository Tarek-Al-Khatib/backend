import { UserModel } from "../models/main.js";

export const incrementUserPoints = async (userId, points) => {
  try {
    const user = await UserModel.findFirstOrThrow({ where: { id: userId } });
    let updatedLevel;
    if (user) {
      updatedLevel = (user.points + points) / (user.level * 50);
    }
    await UserModel.update({
      data: {
        points: { increment: points },
        level: updatedLevel,
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
