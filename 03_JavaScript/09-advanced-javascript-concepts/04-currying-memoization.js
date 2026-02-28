// Currying: transform f(a,b) into f(a)(b)
const multiply = (a) => (b) => a * b
console.log('Curried multiply:', multiply(5)(4))

// Memoization: cache expensive function results
function memoize(fn) {
  const cache = new Map()
  return function memoized(value) {
    if (cache.has(value)) return cache.get(value)
    const result = fn(value)
    cache.set(value, result)
    return result
  }
}

const expensiveSquare = memoize((n) => {
  console.log('Computing...')
  return n * n
})

console.log(expensiveSquare(10))
console.log(expensiveSquare(10))
