import { Reminder, createIntervals, setup } from "./reminders";

jest.useFakeTimers();
jest.spyOn(global, "setInterval");

describe("setup", () => {
  test("should return a list of default reminders", () => {
    const defaultRemindersNames = [
      "eyes",
      "fingers",
      "arms",
      "legs",
      "neck",
      "water",
      "posture",
      "breath",
    ];
    const reminders = setup();
    reminders.every((reminder) =>
      defaultRemindersNames.includes(reminder.name)
    );
  });
});

describe("createIntervals", () => {
  test("should return intervals for each reminder", () => {
    const reminders: Reminder[] = [
      {
        name: "arms",
        title: "Title mock",
        message: "Message mock",
        duration: 2000,
      },
    ];
    const intervals = createIntervals(reminders);

    for (const [name, interval] of intervals) {
      expect(name).toBe("arms");
      expect(setInterval).toHaveBeenCalledTimes(1);
      expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 2000);
      clearInterval(interval);
    }
  });
});
