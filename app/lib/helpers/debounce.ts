let debounceTimeout: number;

/**
 * This function delays the execution of a function until a set amount of time has passed.
 * It's used to avoid unnecessary function calls that can be expensive or time-consuming.
 *
 * @param callback function to be called after the delay elapses
 * @param delay time in milliseconds to delay before triggering the callback
 */

const debounce = (callback: Function, delay: number): void => {
  debounceTimeout = setTimeout(callback, delay);
};

// example:
// const callback = () => {
//   console.log('debounce callback triggered')
// }
// const fn = debounce(callback, 500);
// fn(); // will execute after 500ms
