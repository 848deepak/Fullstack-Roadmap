// Named function: reusable logic for factorial.
function factorial(number) {
  let result = 1
  for (let i = 2; i <= number; i += 1) {
    result *= i
  }
  return result
}

for (let i = 1; i <= 5; i += 1) {
  // Loop through values and print computed output.
  console.log(`Factorial(${i}) =`, factorial(i))
}

// Arrow function syntax (ES6+).
const square = (value) => value * value
console.log('Square of 9:', square(9))
