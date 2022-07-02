export enum TimerType {
  EYES = "EYES",
  LEGS = "LEGS",
}

export type TimerList = Map<TimerType, NodeJS.Timer>;

export type TimerRoutine = () => void;

export const createTimer = (timer: {
  name: TimerType;
  duration: number;
  callback?: () => void;
}): [TimerType, NodeJS.Timer] => [
  timer.name,
  setInterval(() => {
    if (typeof timer.callback === "function") {
      timer.callback();
    }
  }, timer.duration),
];
