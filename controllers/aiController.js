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

const execCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) reject(error);
      resolve(stdout);
    });
  });
};

const readJsonTranscript = async (file) => {
  const data = await fs.readFile(file, "utf8");
  return JSON.parse(data);
};

const audioFileToBase64 = async (file) => {
  const data = await fs.readFile(file);
  return data.toString("base64");
};

ffmpeg.setFfmpegPath(ffmpegStatic);

const convertMp3ToWav = async (id) => {
  return new Promise((resolve, reject) => {
    const inputPath = `audios/message_${id}.mp3`;
    const outputPath = `audios/message_${id}.wav`;

    ffmpeg(inputPath)
      .toFormat("wav")
      .on("start", (commandLine) => {
        console.log("FFmpeg command:", commandLine);
      })
      .on("end", () => {
        console.log("Conversion finished successfully.");
        resolve(outputPath);
      })
      .on("error", (err) => {
        console.error("Error during conversion:", err);
        reject(err);
      })
      .save(outputPath);
  });
};

const lipSyncMessage = async (id) => {
  const time = new Date().getTime();
  console.log(`Starting conversion for message ${id}`);
  await convertMp3ToWav(id);
  console.log(`Conversion done in ${new Date().getTime() - time}ms`);
  await execCommand(
    `${rhubarbPath} -f json -o audios/message_${id}.json audios/message_${id}.wav -r phonetic`
  );
  console.log(`Lip sync done in ${new Date().getTime() - time}ms`);
};
