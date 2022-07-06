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

  test("should load the right data when loading parameters", () => {
    const reminders = setup([
      { name: "arms", frequency: 9001 },
      { name: "posture", frequency: 1234 },
    ]);
    const armsReminder = reminders.find((r) => r.name === "arms");
    const postureReminder = reminders.find((r) => r.name === "posture");

    expect(armsReminder.frequency).toEqual(9001);
    expect(postureReminder.frequency).toEqual(1234);
  });
});

describe("createIntervals", () => {
  test("should return intervals for each reminder", () => {
    const reminders: Reminder[] = [
      {
        name: "arms",
        title: "Title mock",
        message: "Message mock",
        frequency: 2000,
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
