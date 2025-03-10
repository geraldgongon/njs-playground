"use client";

import { useEffect, useRef, useState } from "react";

interface StopwatchProps {}

const Stopwatch = (params: StopwatchProps) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  //   const timerRef = useRef<any>(null);
  let timerRef: any;

  useEffect(() => {
    if (isRunning) {
      timerRef = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Increment every 10 milliseconds
      }, 10);
    } else {
      clearInterval(timerRef);
    }

    return () => {
      clearInterval(timerRef);
    };
  }, [isRunning]);

  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
  };

  const HOURS_IN_MILLIS = 1000 * 60 * 60;
  const MINUTES_IN_MILLIS = 1000 * 60;
  const SECONDS_IN_MILLIS = 1000;

  const formatTime = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / HOURS_IN_MILLIS);
    const minutes = Math.floor(milliseconds / MINUTES_IN_MILLIS) % 60;
    const seconds = Math.floor(milliseconds / SECONDS_IN_MILLIS) % 60;
    const ms = milliseconds % 1000;

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    const formattedMs = String(ms).padStart(3, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMs}`;
  };

  return (
    <>
      <div>{formatTime(time)}</div>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "stop" : "start"}
      </button>

      <button onClick={resetTimer}>reset</button>
    </>
  );
};

export default Stopwatch;
