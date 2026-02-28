// Demonstrates conditional logic and ternary operators.
const marks = 84

const grade =
  marks >= 90 ? 'A+' :
  marks >= 80 ? 'A' :
  marks >= 70 ? 'B' :
  marks >= 60 ? 'C' : 'D'

console.log('Marks:', marks)
console.log('Grade:', grade)

if (marks >= 60 && marks <= 100) {
  console.log('Result: Pass')
} else {
  // This branch handles invalid marks or failure.
  console.log('Result: Check input')
}
