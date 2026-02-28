// Spread operator for arrays and objects.
const numbers = [2, 4, 6]
const moreNumbers = [...numbers, 8, 10]

const user = { name: 'Deepak', role: 'Student' }
const updatedUser = { ...user, role: 'Frontend Developer' }
const settings = { theme: null }

// Object destructuring in function parameters.
function greet({ name, role }) {
  return `Hello ${name}, role: ${role}`
}

// Array destructuring.
const [first, second] = moreNumbers
console.log('Destructured:', first, second)
console.log('Spread array:', moreNumbers)
console.log('Spread object:', updatedUser)
console.log('Optional chaining:', updatedUser?.name)
console.log('Nullish coalescing:', settings.theme ?? 'light')
console.log(greet(updatedUser))
