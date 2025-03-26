import { MouseEventHandler, useRef, useState } from "react";

interface usePreviousResponse {
  currentVal: number;
  previousVal: number;
  clickHandler: MouseEventHandler<HTMLAnchorElement>;
}

const usePrevious = (): usePreviousResponse => {
  const statevarRef = useRef(0);
  // capture the current state and the previous state
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
