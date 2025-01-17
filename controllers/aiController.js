import fetch from "node-fetch";
import { promises as fs } from "fs";
import * as fss from "node:fs";
import OpenAI from "openai";
import { interviewRepository } from "../repositories/interviewRepository.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "-",
});

const elevenLabsApiKey = process.env.ELEVEN_LABS_API_KEY;

const textToSpeech = async (text, outputFilePath, voiceId) => {
  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
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

const audioFileToBase64 = async (file) => {
  const data = await fs.readFile(file);
  return data.toString("base64");
};

export const interviewChat = async (req, res) => {
  const messages = req.body.messages;
  const speciality = req.body.speciality;
  const characteristics = req.body.characteristics;
  const voiceId = req.body.voiceId;
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
        Your personality is: ${characteristics}
        You are just and interviewer for the job role ${speciality}
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
  await textToSpeech(textInput, fileName, voiceId);
  message.audio = await audioFileToBase64(fileName);

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

export const topLearningPicks = async (req, res) => {
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
            You are a learning plan creator. You have multiple industries (Coding, Business etc...)
            You will always reply with one JSON formatted message.
            The message contains the 3 plans (array of objects) where each one has title (max 100 char), description (max 300 char), 
            category (one word), is_added which is false by default, and array of steps.
            The steps are an array of objects which has step_title (max 50 char), and step_description (max 300 char) properties for each object
            Each learning plan is almost 7-15 steps.
            `,
          },
        ],
      });

      let plansResponse = completion.choices[0].message;
      let plans = JSON.parse(plansResponse.content);
      res.status(200).json({ ...plans });
    }
  } catch (error) {
    console.log(error);
  }
};
