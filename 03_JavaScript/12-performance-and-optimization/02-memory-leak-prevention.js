// Bad pattern: interval without cleanup can leak memory.
// Good pattern: keep timer id and clear it when no longer needed.

const timerId = setInterval(() => {
  console.log('Running task...')
}, 1000)

setTimeout(() => {
  clearInterval(timerId)
  console.log('Interval cleared to prevent leak')
}, 3500)
