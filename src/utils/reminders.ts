import { Notification } from "electron";

export type ReminderType =
  | "eyes"
  | "fingers"
  | "arms"
  | "legs"
  | "neck"
  | "water"
  | "posture"
  | "breath";

export interface Reminder {
  name: ReminderType;
  title: string;
  message: string;
  frequency?: number;
}

const notify = (reminder: Reminder) => {
  const notification = new Notification({
    title: reminder.title,
    body: reminder.message,
  });
  notification.show();
};

export const setup = (preferences?: Partial<Reminder>[]) => {
  const reminders: Reminder[] = [
    {
      name: "eyes",
      title: "Blink your eyes",
      message:
        "Look away from the screen and slowly blink your eyes for 10 seconds.",
    },
    {
      name: "fingers",
      title: "Stretch your fingers",
      message:
        "Spread out your palm wide, then close it into a fist. Repeat 5 times.",
    },
    {
      name: "arms",
      title: "Stretch your arms",
      message: "Stretch your arms, and twist your wrists for 10 seconds.",
    },
    {
      name: "legs",
      title: "Stretch your legs",
      message: "Stand up, twist each ankle, and bend each knee.",
    },
    {
      name: "neck",
      title: "Turn your neck",
      message: "Turn your head in all directions. Repeat 3 times.",
    },
    {
      name: "water",
      title: "Hydrate yourself",
      message: "Drink a glass of water.",
    },
    {
      name: "posture",
      title: "Watch your posture",
      message: "Make sure your back is straight.",
    },
    {
      name: "breath",
      title: "Focus on your breath",
      message: "Inhale and exhale deeply, thrice.",
    },
  ];
  const mergedReminders = Object.assign(reminders, preferences);
  return mergedReminders;
};

export const createIntervals = (reminders: Reminder[]) => {
  const intervals = new Map<Reminder["name"], NodeJS.Timer>();
  for (const reminder of reminders) {
    if (!reminder.frequency) return;
    intervals.set(
      reminder.name,
      setInterval(() => notify(reminder), reminder.frequency)
    );
  }
  return intervals;
};
