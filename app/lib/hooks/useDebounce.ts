import { KeyboardEventHandler } from "react";

interface useDebounceResponse {
  debounceHandler: KeyboardEventHandler<HTMLInputElement>;
}

const useDebounce = (callback: Function): useDebounceResponse => {
  // use a setTimeout
  let debounceTimeout: string | number | NodeJS.Timeout | undefined;

  const debounceHandler = () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(callback, 500);
  };

  return { debounceHandler };
};

export default useDebounce;
