const scores = [60, 85, 90]

// Creating arrays and common mutating methods
scores.push(95)
scores.pop()
scores.unshift(50)
scores.shift()

// Non-mutating methods
const mapped = scores.map((value) => value + 5)
const filtered = scores.filter((value) => value >= 80)
const reduced = scores.reduce((total, value) => total + value, 0)
const found = scores.find((value) => value === 85)
const someCheck = scores.some((value) => value > 89)
const everyCheck = scores.every((value) => value >= 60)

scores.forEach((value, index) => {
  console.log(`Score ${index + 1}:`, value)
})

const [first, second] = scores // array destructuring

console.log({ mapped, filtered, reduced, found, someCheck, everyCheck, first, second })
