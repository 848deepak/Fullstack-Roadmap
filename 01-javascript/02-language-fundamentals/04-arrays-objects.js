// Array of objects: common real-world structure.
const products = [
  { id: 1, name: 'Keyboard', price: 999 },
  { id: 2, name: 'Mouse', price: 499 },
  { id: 3, name: 'Monitor', price: 8999 },
]

// filter: keeps elements that match condition.
const premium = products.filter((item) => item.price > 1000)
// map: transforms each element.
const names = products.map((item) => item.name)
// reduce: combines array into one value.
const total = products.reduce((sum, item) => sum + item.price, 0)

console.log('Premium products:', premium)
console.log('Product names:', names)
console.log('Total price:', total)
