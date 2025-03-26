"use client";

import useDebounce from "../lib/hooks/useDebounce";
import useWindow from "../lib/hooks/useWindow";

export default function Exercises() {
  const { width, height } = useWindow();
  const { debounceHandler } = useDebounce(() => {
    console.log("debounce function triggered");
  });
  return (
    <>
      <div>Some random exercises to shake off those React cobwebs</div>
      <p>custom hooks</p>
      <ul>
        <li>
          Implement useWindow, a custom hook that tracks the window size and
          returns width and height ({width}, {height})
        </li>
        <li>
          Implement useDebounce, a hook that delays the execution of a function
          <br />
          <input type="text" onKeyUp={debounceHandler} />
        </li>
        <li>
          Implement usePrevious, a hook to track the previous state value{" "}
        </li>
        <li>
          Implement useLocalStorage, a hook that reads and writes values to
          localStorage
        </li>
      </ul>

      <p>Take Home Assignments</p>
      <ul>
        <li>
          Build a simple task management app where users can add, edit, and
          delete tasks Implement a e-commerce product listings page that allows
          for searching, filtering, and sorting
        </li>
        <li>
          Create a weather app that fetches data from an API and displays
          weather conditions dynamically
        </li>
        <li>
          Design and implement a dashboard with charts using React and a
          charting library
        </li>
      </ul>
    </>
  );
}
