import { TimerType, createTimer } from "./timers";

jest.useFakeTimers();
jest.spyOn(global, "setInterval");

const mockCallback = jest.fn();

describe("createTimer", () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  });

  test("should create and launch a timer", () => {
    const [type, timer] = createTimer({
      name: TimerType.EYES,
      duration: 8000,
      callback: mockCallback,
    });

    expect(type).toBe(TimerType.EYES);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 8000);

    clearInterval(timer);
  });
});
