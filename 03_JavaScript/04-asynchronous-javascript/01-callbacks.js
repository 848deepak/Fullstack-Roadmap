// Callback pattern: function passed as an argument.
function fetchUser(callback) {
  setTimeout(() => {
    // Simulate delayed response from server.
    callback({ id: 1, name: 'Deepak' })
  }, 500)
}

fetchUser((user) => {
  console.log('Callback user:', user)
})
