// Promise wrapper around setTimeout.
function wait(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Waited ${milliseconds}ms`), milliseconds)
  })
}

wait(700)
  .then((message) => console.log(message))
  .catch((error) => console.error(error))
