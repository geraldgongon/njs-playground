import { Ref, useEffect, useRef, useState } from "react";

/**
 * note:  every time the window is resized, this hook will trigger a re-render. Using
 *   a React.Ref will not work here, as Refs do not trigger re-renders.
 *
 *   other options:
 *   - use refs and trigger the refresh via a minimal state change
 *
 */

// export type useWindowResponse = [width: Ref<number>, height: Ref<number>];
export type useWindowResponse = { width: number; height: number };
const useWindow = (): useWindowResponse => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const resizeHandler = (): void => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    resizeHandler();
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);
  return dimensions;
};

export default useWindow;
