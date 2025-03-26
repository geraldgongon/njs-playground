"use client";

import useDebounce from "../lib/hooks/useDebounce";
import usePrevious from "../lib/hooks/usePrevious";
import useWindow from "../lib/hooks/useWindow";

export default function Exercises() {
  const { width, height } = useWindow();
  const { currentVal, previousVal, clickHandler } = usePrevious();
  const { debounceHandler } = useDebounce(() => {
    console.log("debounce function triggered");
  });

  return (
    <>
      <div>Some random exercises to shake off those React cobwebs</div>
      <h2 className="text-xl pt-10">custom hooks</h2>
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
          <a onClick={clickHandler}>
            Implement usePrevious, a hook to track the previous state value
          </a>
          <br />
          CurrentVal: {currentVal}
          <br />
          PreviousVal: {previousVal}
        </li>
        <li>
          Implement useLocalStorage, a hook that reads and writes values to
          localStorage
        </li>
      </ul>

      <h2 className="text-xl pt-10">Take Home Assignments</h2>
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
