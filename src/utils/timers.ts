export enum TimerType {
  EYES = "EYES",
  LEGS = "LEGS",
}

export type TimerRoutine = () => void;

export const initTimers = (timers: { name: TimerType; duration: number }[]) =>
  timers.map((timer) =>
    setInterval(() => {
      console.log(`${timer.name} run!`);
    }, timer.duration)
  );
