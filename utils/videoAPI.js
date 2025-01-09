import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.DAILY_API_KEY;

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + API_KEY,
};
