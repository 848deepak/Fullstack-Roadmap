// Lexical scope + closure: inner function remembers outer variables.
function createCounter() {
  let count = 0
  return function increment() {
    count += 1
    return count
  }
}

const counter = createCounter()
console.log(counter())
console.log(counter())

// Hoisting: function declarations are hoisted.
hoistedFunction()
function hoistedFunction() {
  console.log('Function declaration is hoisted')
}
