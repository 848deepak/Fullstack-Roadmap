// Set stores unique values only.
const uniqueValues = new Set([1, 2, 2, 3])
// Map stores key-value pairs.
const userRole = new Map([
  ['deepak', 'admin'],
  ['alex', 'editor'],
])

console.log('Set:', [...uniqueValues])
console.log('Role of deepak:', userRole.get('deepak'))
