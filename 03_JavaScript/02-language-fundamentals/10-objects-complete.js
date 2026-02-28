const student = {
  name: 'Deepak',
  age: 21,
  skills: ['JavaScript', 'React'],
  introduce() {
    // "this" points to current object when called as student.introduce()
    return `${this.name} is learning ${this.skills.join(', ')}`
  },
}

console.log(student.name) // dot notation
console.log(student['age']) // bracket notation
console.log(student.introduce())

const { name, age } = student // object destructuring
console.log(name, age)

console.log(Object.keys(student))
console.log(Object.values(student))
console.log(Object.entries(student))

// Shallow copy (nested objects/arrays still shared)
const shallowCopy = { ...student }

// Deep copy for JSON-safe objects
const deepCopy = JSON.parse(JSON.stringify(student))

console.log('Shallow copy:', shallowCopy)
console.log('Deep copy:', deepCopy)
