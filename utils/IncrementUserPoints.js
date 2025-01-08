import { UserModel } from "../models/main.js";

export const incrementUserPoints = async (userId, points) => {
  try {
    const user = await UserModel.findFirstOrThrow({ where: { id: userId } });
    if (user) {
      const newPoints = user.points + points;
      const levelThreshold = user.level * 50;

      while (newPoints >= levelThreshold) {
        user.level += 1;
        levelThreshold = user.level * 50;
      }

      user.points = newPoints;
    }

    await UserModel.update({
      data: {
        points: user.points,
        level: user.level,
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
