let timeout = null;

function debounce(func, delay) {
  // timeout 初始值
  return function (...args) {
    if (timeout) {
      clearTimeout(timeout);
    }
    const context = this;
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

export default debounce;
