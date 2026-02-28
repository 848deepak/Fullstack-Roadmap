console.log('Script start')

setTimeout(() => {
  console.log('Macrotask: setTimeout callback')
}, 0)

Promise.resolve().then(() => {
  console.log('Microtask: promise then callback')
})

console.log('Script end')

// Expected order:
// 1) Script start
// 2) Script end
// 3) Microtask...
// 4) Macrotask...
