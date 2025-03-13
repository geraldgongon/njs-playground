"use client";
// import React from "react"; //needed to get rid of UMD errors.  find a way to remove this
import { useEffect, useRef, useState } from "react";

interface StopwatchProps {}

export const SECONDS_IN_MILLIS = 1000;
export const MINUTE_IN_MILLIS = SECONDS_IN_MILLIS * 60;
export const HOUR_IN_MILLIS = MINUTE_IN_MILLIS * 60;
export const DAY_IN_MILLIS = HOUR_IN_MILLIS * 24;

const Stopwatch = (props: StopwatchProps) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Increment every 10 milliseconds
      }, 10);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (milliseconds: number) => {
    const days = Math.floor(milliseconds / DAY_IN_MILLIS) % 24;
    const hours = Math.floor(milliseconds / HOUR_IN_MILLIS) % 24;
    const minutes = Math.floor(milliseconds / MINUTE_IN_MILLIS) % 60;
    const seconds = Math.floor(milliseconds / SECONDS_IN_MILLIS) % 60;
    const ms = milliseconds % 1000;

    const formattedDays = String(days).padStart(2, "0");
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    const formattedMs = String(ms).padStart(3, "0");

    return `${formattedDays}:${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMs}`;
  };

  return (
    <div className="flex h-screen justify-center items-center flex-col ">
      <div className="border-2 border-solid rounded-md p-6 items-center">
        <h1 className="text-4xl pb-5">{formatTime(time)}</h1>

        <div className="flex justify-center items-center">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-5 border-2 border-solid rounded-md bg-sky-700 hover:bg-sky-500"
          >
            {isRunning ? "stop" : "start"}
          </button>

          <button
            onClick={resetTimer}
            className="ml-6 px-5 border-2 border-solid rounded-md bg-sky-700 hover:bg-sky-500"
          >
            reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
