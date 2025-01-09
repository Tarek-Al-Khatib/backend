import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const API_KEY = process.env.DAILY_API_KEY;

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${API_KEY}`,
};

export const getRoom = async (room) => {
  try {
    const response = await fetch(`https://workwise.daily.co/v1/rooms/${room}`, {
      method: "GET",
      headers,
    });
    response = await response.json();

    return response;
  } catch (error) {
    console.log("Error fetching room in get room func:", error);
    return error;
  }
};

export const createRoom = async (room) => {
  try {
    const response = await fetch("https://workwise.daily.co/v1/rooms", {
      method: "POST",
      headers,
      body: JSON.stringify({
        name: room,
        properties: {
          enable_screenshare: true,
          enable_chat: true,
          start_video_off: true,
          start_audio_off: false,
          lang: "en",
        },
      }),
    });
    response = await response.json();

    return response;
  } catch (error) {
    console.log("Error creating room in create room func:", error);
    return error;
  }
};
