'use strict';

// Beginner: debounce delays execution until user stops triggering events.
// Advanced: cancel method prevents stale callbacks during component unmount.
function debounce(fn, delayMs = 250) {
  let timerId;

  function wrapped(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delayMs);
  }

  wrapped.cancel = () => clearTimeout(timerId);
  return wrapped;
}

// Beginner: throttle limits function execution frequency.
// Advanced: useful for scroll/resize to control CPU usage.
function throttle(fn, intervalMs = 250) {
  let lastRun = 0;

  return (...args) => {
    const now = Date.now();
    if (now - lastRun < intervalMs) return;

    lastRun = now;
    fn(...args);
  };
}

const onSearch = debounce((text) => console.log('search:', text), 200);
const onScroll = throttle(() => console.log('scroll tick'), 300);

onSearch('react');
onSearch('react hooks');
onScroll();
