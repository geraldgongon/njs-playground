import { MouseEventHandler, useRef, useState } from "react";

interface usePreviousResponse {
  currentVal: number;
  previousVal: number;
  clickHandler: MouseEventHandler<HTMLAnchorElement>;
}

const usePrevious = (): usePreviousResponse => {
  // capture previous state in a ref to prevent excessive re-renders
  const statevarRef = useRef(0);
  // capture the current value in state
  const [statevar, setStatevar] = useState<number>(0);

  const clickHandler = () => {
    statevarRef.current = statevar;
    setStatevar((statevar) => statevar + 1);
  };

  return {
    currentVal: statevar,
    previousVal: statevarRef.current,
    clickHandler,
  };
};

export default usePrevious;
