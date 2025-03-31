/**
 * @callback func
 * @param {number} wait
 * @return {Function}
 */

export default function throttle(func: Function, wait: number) {
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
