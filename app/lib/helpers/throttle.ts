/**
 * Throttling limits the rate at which requests or data can be processed or transmitted,
 * ensuring system stability and preventing overload, especially in large-scale, distributed
 * environments.
 * This function will only call the function once during any given wait time.
 *
 * @callback func
 * @param {number} wait time
 * @return {Function}
 */

export default function throttle(func: Function, wait: number): Function {
  let timeout: string | number | NodeJS.Timeout | undefined;
  return function () {
    if (!timeout) {
      func.apply(this, arguments);
    }
    timeout = setTimeout(() => {
      clearTimeout(timeout);
      timeout = undefined;
    }, wait);
  };
}
