export enum TimerType {
  EYES = "EYES",
  LEGS = "LEGS",
}

export type TimerRoutine = () => void;

export const initTimers = (
  timers: { name: TimerType; duration: number; callback?: () => void }[]
) =>
  timers.map((timer) =>
    setInterval(() => {
      console.log(`${timer.name} run!`);
      if (typeof timer.callback === "function") {
        timer.callback();
      }
    }, timer.duration)
  );
