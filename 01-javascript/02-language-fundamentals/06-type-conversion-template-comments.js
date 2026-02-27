// Single-line comment: JavaScript ignores this line.
/*
  Multi-line comment:
  Useful for explaining bigger code blocks.
*/

const numericString = '42'
const convertedNumber = Number(numericString) // explicit conversion
const implicitConversion = numericString * 2 // implicit conversion by operator

const userName = 'Deepak'
const score = 98

// Template literals use backticks and ${expression}.
const summary = `Student ${userName} scored ${score}`

console.log('Explicit conversion:', convertedNumber)
console.log('Implicit conversion:', implicitConversion)
console.log(summary)
