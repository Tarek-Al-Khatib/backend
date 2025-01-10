import fetch from "node-fetch";
import path from "node:path";
import * as fss from "node:fs";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "-",
});

const elevenLabsApiKey = process.env.ELEVEN_LABS_API_KEY;
const voiceID = "jsCqWAovK2LkecY7zXl4";

const textToSpeech = async (text, outputFilePath) => {
  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": elevenLabsApiKey,
        },
        body: JSON.stringify({
          text: text,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.7,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to generate audio: ${response.statusText}`);
    }
    const writer = fss.createWriteStream(outputFilePath);
    response.body.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", () => resolve(outputFilePath));
      writer.on("error", reject);
    });
  } catch (error) {
    console.error("Error generating text-to-speech:", error.message);
    throw error;
  }
};
