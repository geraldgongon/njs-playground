"use client";

import { useEffect, useState } from "react";

/**
 * requirements:
 * Create a component captures:
 * 1. all clicks anywhere on the screen
 * 2. timestamp of each click
 *
 * and displays:
 * 1. total clicks on the page
 * 2. the timestamp of each click
 *  */
// 1.

const ClickAround = () => {
  const [clicks, setClicks] = useState<number>(0);
  const [dates, setDates] = useState<String[]>([]);

  const clickHandler = () => {
    //capture the event
    setClicks((clicks) => clicks + 1);

    // add a timestamp to the list
    const d = new Date().toString();
    setDates((dates) => [d, ...dates]);
  };

  useEffect(() => {
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });
  return (
    <>
      <p>click anywhere on the body to capture the event</p>
      <h1>clicks: {clicks}</h1>
      <ul>
        {dates.map((date) => (
          <li key={`${date}-${Math.random()}`}>{date}</li>
        ))}
      </ul>
    </>
  );
};

export default ClickAround;
