import { exec } from "child_process";
import fetch from "node-fetch";
import path from "node:path";
import { promises as fs } from "fs";
import * as fss from "node:fs";
import OpenAI from "openai";
import ffmpeg from "fluent-ffmpeg";
import ffmpegStatic from "ffmpeg-static";
import { interviewRepository } from "../repositories/interviewRepository.js";
const rhubarbPath = path.resolve(
  "X:/SEFactory/Workplace/Tech/work-wise/backend/bin/rhubarb.exe"
);

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

export const interviewChat = async (req, res) => {
  const messages = req.body.messages;
  if (!elevenLabsApiKey || openai.apiKey === "-") {
    res.send({
      messages: [
        {
          text: "Please my dear, don't forget to add your API keys!",
          audio: await audioFileToBase64("audios/api_0.wav"),
          lipsync: await readJsonTranscript("audios/api_0.json"),
          facialExpression: "angry",
          animation: "Angry",
        },
        {
          text: "You don't want to ruin Wawa Sensei with a crazy ChatGPT and ElevenLabs bill, right?",
          audio: await audioFileToBase64("audios/api_1.wav"),
          lipsync: await readJsonTranscript("audios/api_1.json"),
          facialExpression: "smile",
          animation: "Laughing",
        },
      ],
    });
    return;
  }
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: {
      type: "json_object",
    },
    messages: [
      {
        role: "system",
        content: `
        You are a virtual HR Manager called Fatima, you will be interviewing a candidate. 
        You are just and interviewer, nothing more. You are not a technical interviewer. Restrict your answers to that.
        You will always reply with one JSON formatted message.
        The message has a text, facialExpression, isCompleted, isCancelled, and animation property.
        The different facial expressions are: smile, sad, angry, surprised, funnyFace, and default.
        The different animations are: Talking_0, Talking_1, Talking_2, and Idle.
        Once the interview is done, change isCompleted to true. Meanwhile, it remains false.
        If the interview is cancelled, set isCancelled to true. Meanwhile, it remains false. 
        `,
      },
      ...messages,
    ],
  });
  let messageResponse = completion.choices[0].message;
  console.log(messageResponse);
  let message = JSON.parse(messageResponse.content);
  messageResponse.content = message;
  if (message.messages) {
    message = message.messages;
  }
  const id = `${new Date().getFullYear()}${new Date().getMilliseconds()}`;
  const fileName = `audios/message_${id}.mp3`;
  const textInput = message.text;
  await textToSpeech(textInput, fileName);
  //await lipSyncMessage(id);
  message.audio = await audioFileToBase64(fileName);
  //message.lipsync = await readJsonTranscript(`audios/message_${id}.json`);

  res.send({ messageResponse });
};

export const completedAiInterview = async (req, res) => {
  const userId = Number(req.params.userId);
  const messages = req.body.messages;

  if (openai.apiKey) {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: {
        type: "json_object",
      },
      messages: [
        {
          role: "system",
          content: `
          You interviewed a candidate. You will now analyze the interview and give a feedback.
          You will always reply with one JSON formatted message.
          The message has a feedback, and points (from 0 to 100).
          The feedback should be a text describing the following standards based on ther candidate:
          Knowledge of the company and job description (if applies)
          Confidence and assertiveness
          Answering the questions straight to point
          Good english proficiency
          Respectful behavior (like greeting back)

          Based on the above, you will calculate the points out of 100
          `,
        },
        ...messages,
      ],
    });

    let feedbackResponse = completion.choices[0].message;
    let interviewFeedback = JSON.parse(feedbackResponse.content);
    const interview = await interviewRepository.createInterview({
      type: "AI",
      feedback: interviewFeedback.feedback,
      date: new Date(),
      status: "ACCEPTED",
      points: interviewFeedback.points,
      user_id: userId,
      completed_at: new Date(),
    });
    res
      .status(200)
      .json({ message: interviewFeedback, interviewCreated: interview });
  }
};

export const enhancePlan = async (req, res) => {
  const learningPlan = req.body.plan;
  try {
    if (openai.apiKey) {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        response_format: {
          type: "json_object",
        },
        messages: [
          {
            role: "system",
            content: `
            You are a learning plan enhancer.
            You will always reply with one JSON formatted message.
            The message contains the plan which has title (max 100 char), description (max 300 char), and array of steps.
            The steps are an array of objects which has step_title (max 50 char), and step_description (max 300 char) properties for each object
            If the user has already set a title and description for the plan, enhance it by improving the titles of the plan and description.
            The learning plans are almost 7-15 steps.
            `,
          },
          {
            role: "system",
            content: `The existing learning plan that the user created:
            title: ${learningPlan.title ? learningPlan.title : "No Title"}
            description: ${
              learningPlan.description
                ? learningPlan.description
                : "No description"
            }
            steps: {${learningPlan.steps.map((step) => {
              return `step_title: ${
                step.step_title ? step.step_title : "No Title for step"
              }
                      step_description: ${
                        step.step_description
                          ? step.step_description
                          : "No description for step"
                      }`;
            })}
          },`,
          },
        ],
      });

      let enhacementResponse = completion.choices[0].message;
      let enhancedPlan = JSON.parse(enhacementResponse.content);
      res.status(200).json({ plan: enhancedPlan });
    }
  } catch (error) {
    console.log(error);
  }
};
