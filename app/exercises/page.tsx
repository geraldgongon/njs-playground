"use client";

import { Checkbox, FormControlLabel } from "@mui/material";
import useDebounce from "../lib/hooks/useDebounce";
import usePrevious from "../lib/hooks/usePrevious";
import useWindow from "../lib/hooks/useWindow";
import { useState } from "react";
import { checklist, takeHomeAssignments } from "./internals/assignments";
import { useGetData } from "../lib/hooks/useGetData";

export default function Exercises() {
  const [assignments, setAssignments] = useState(takeHomeAssignments);
  const [debounceTimeElapsed, setDebounceTimeElapsed] =
    useState<boolean>(false);

  useGetData();
  const { width, height } = useWindow();
  const { currentVal, previousVal, clickHandler } = usePrevious();

  const { debounceHandler } = useDebounce(() => {
    console.log("debounce function triggered");
    setDebounceTimeElapsed(true);
  }, 250);

  const updateStatus = (assignment: checklist) => {
    let l_assignments = [...assignments];

    let l_assignment = l_assignments.find((a) => a.label === assignment.label);

    l_assignment!.completed = !l_assignment?.completed;
    setAssignments(l_assignments);
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl">
        Some random exercises to shake off those React cobwebs
      </h1>
      <h2 className="text-xl pt-10">custom hooks</h2>

      <ul>
        <li>
          <FormControlLabel
            control={<Checkbox />}
            label={`Implement useWindow, a custom hook that tracks the window size and
          returns width and height (${width}, ${height})`}
            checked={true}
          />
        </li>
        <li>
          <FormControlLabel
            control={<Checkbox />}
            label={
              "Implement useDebounce, a hook that delays the execution of a function"
            }
            checked={true}
          />
          <br />
          <input type="text" onKeyUp={debounceHandler} />
          &nbsp; {debounceTimeElapsed && "Debounce function triggered"}
        </li>
        <li>
          <Checkbox checked={true} />
          Implement usePrevious, a hook to track the previous state value (
          <a
            className="underline text-blue-600 cursor-pointer"
            onClick={clickHandler}
          >
            click here
          </a>
          to update CurrentVal)
          <br />
          CurrentVal: {currentVal}
          <br />
          PreviousVal: {previousVal}
        </li>
        <li>
          <FormControlLabel
            control={<Checkbox />}
            label={
              "Implement useLocalStorage, a hook that reads and writes values to localStorage"
            }
            checked={true}
          />
        </li>
        <li>
          <FormControlLabel
            control={<Checkbox />}
            label={
              "capture multiple ways of fetching data (e.g. fetch, axios, react query...)"
            }
            checked={false}
          />
        </li>
      </ul>

      <h2 className="text-xl pt-10">Take Home Assignments</h2>
      <ul>
        {assignments.map((assignment, idx) => (
          <li key={`assignment-${idx}`}>
            <FormControlLabel
              control={<Checkbox onClick={(e) => updateStatus(assignment)} />}
              label={assignment.label}
              checked={assignment.completed}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
