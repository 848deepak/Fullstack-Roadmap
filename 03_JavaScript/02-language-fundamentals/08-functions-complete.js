// Function declaration
function add(a, b) {
  return a + b
}

// Function expression
const multiply = function (a, b) {
  return a * b
}

// Arrow function + default parameter
const greet = (name = 'Guest') => `Hello, ${name}`

// Rest parameter collects remaining arguments
function sumAll(...numbers) {
  return numbers.reduce((total, value) => total + value, 0)
}

// Callback function
function processInput(value, callback) {
  return callback(value)
}

// Higher-order function (takes function as argument)
const toUpper = (text) => text.toUpperCase()

// Spread operator while calling function
const numbers = [10, 20, 30]
console.log('Add:', add(5, 7))
console.log('Multiply:', multiply(3, 4))
console.log(greet('Deepak'))
console.log('Sum all:', sumAll(...numbers))
console.log('Callback/HOF:', processInput('javascript', toUpper))
