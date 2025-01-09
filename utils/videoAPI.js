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
    console.log("Error fetchin room in get room func:", error);
    return error;
  }
};
