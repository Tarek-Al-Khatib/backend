import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createRoom, getRoom } from "../utils/videoAPI.js";

const router = express.Router();

router.get("/interview-mod/:roomId", authMiddleware, async (req, res) => {
  const roomId = req.params.roomId;
  const room = await getRoom(roomId);

  if (room.error) {
    const newRoom = await createRoom(roomId);
    res
      .status(200)
      .json({ message: `Created the room with id ${roomId}`, room: newRoom });
  } else {
    res.status(200).json(room);
  }
});

export default router;
