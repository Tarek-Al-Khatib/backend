import schedule from "node-schedule";
import { sendNotification } from "./sendNotification";

export const scheduleInterviewReminders = (interview) => {
  const { id, date, user_id, moderator_id } = interview;

  const interviewDate = new Date(date);
  const reminders = [
    {
      time: new Date(interviewDate.getTime() - 24 * 60 * 60 * 1000),
      message: "Your interview is scheduled for tomorrow.",
    },
    {
      time: new Date(interviewDate.getTime() - 1 * 60 * 60 * 1000),
      message: "Your interview starts in 1 hour.",
    },
    {
      time: new Date(interviewDate.getTime() - 15 * 60 * 1000),
      message: "Your interview starts in 15 minutes.",
    },
  ];

  reminders.forEach(({ time, message }) => {
    if (time > new Date()) {
      schedule.scheduleJob(
        `reminder-${id}-${time.getTime()}`,
        time,
        async () => {
          await sendNotification(user_id, "REMINDER", message);

          if (moderator_id) {
            await sendNotification(
              moderator_id,
              "REMINDER",
              `Reminder: Interview with user ID ${user_id} starts soon.`
            );
          }
        }
      );
    }
  });
};
