import { KeyboardEventHandler } from "react";

interface useDebounceResponse {
  debounceHandler: KeyboardEventHandler<HTMLInputElement>;
}

const useDebounce = (
  callback: Function,
  delay: number,
): useDebounceResponse => {
  // use a setTimeout
  let debounceTimeout: string | number | NodeJS.Timeout | undefined;

  const debounceHandler = () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(callback, delay);
  };

  return { debounceHandler };
};

export default useDebounce;
