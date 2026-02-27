// Returns a promise that resolves with fake order data.
function fetchOrder() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: 101, status: 'confirmed' }), 400)
  })
}

async function run() {
  // await pauses inside async function until promise resolves.
  const order = await fetchOrder()
  console.log('Order:', order)
}

run()
