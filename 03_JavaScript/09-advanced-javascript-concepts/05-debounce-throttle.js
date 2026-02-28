function debounce(fn, delay) {
  let timerId
  return function (...args) {
    clearTimeout(timerId)
    timerId = setTimeout(() => fn(...args), delay)
  }
}

function throttle(fn, delay) {
  let canRun = true
  return function (...args) {
    if (!canRun) return
    fn(...args)
    canRun = false
    setTimeout(() => {
      canRun = true
    }, delay)
  }
}

const debouncedLog = debounce((value) => console.log('Debounced:', value), 300)
const throttledLog = throttle((value) => console.log('Throttled:', value), 300)

debouncedLog('search A')
debouncedLog('search AB')
throttledLog('scroll 1')
throttledLog('scroll 2')
