import { UserModel } from "../models/main.js";

export const incrementUserPoints = async (userId, points) => {
  try {
    const user = await UserModel.findUnique({ where: { id: userId } });
    if (!user) throw new Error(`User with ID ${userId} not found`);

    let newPoints = user.points + points;
    let levelThreshold = user.level * 50;

    while (newPoints >= levelThreshold) {
      user.level += 1;
      levelThreshold = user.level * 50;
    }

    await UserModel.update({
      data: {
        points: newPoints,
        level: user.level,
      },
      where: {
        id: userId,
      },
    });

    return true;
  } catch (error) {
    console.error(
      `Error incrementing points for user ID ${userId}:`,
      error.message
    );
    return false;
  }
};
