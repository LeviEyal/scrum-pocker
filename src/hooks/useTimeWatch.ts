import { useEffect, useState } from "react";

/**
 * A custom hook that provides functionality for tracking time.
 *
 * @returns An object containing the following functions and values:
 *   - `formatedTime`: A function that returns the formatted time in the format "mm:ss".
 *   - `resetTimewatch`: A function that resets the time and stops the timer.
 *   - `startTimewatch`: A function that starts the timer.
 *   - `stopTimewatch`: A function that stops the timer.
 *   - `isRunning`: A boolean indicating whether the timer is currently running.
 */
export const useTimeWatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
  }, [isRunning, time]);

  const resetTimewatch = () => {
    setTime(0);
    setIsRunning(false);
  };

  const startTimewatch = () => {
    setIsRunning(true);
  };

  const stopTimewatch = () => {
    setIsRunning(false);
  };

  const formatedTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
      }`;
  };

  return { formatedTime, resetTimewatch, startTimewatch, stopTimewatch, isRunning };

}