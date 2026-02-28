function stepOne(callback) {
  setTimeout(() => callback(null, 'Step 1 complete'), 200)
}

function stepTwo(callback) {
  setTimeout(() => callback(null, 'Step 2 complete'), 200)
}

function stepThree(callback) {
  setTimeout(() => callback(null, 'Step 3 complete'), 200)
}

// Callback hell example: nested callbacks become hard to read/maintain.
stepOne((error1, result1) => {
  if (error1) return console.error(error1)
  console.log(result1)

  stepTwo((error2, result2) => {
    if (error2) return console.error(error2)
    console.log(result2)

    stepThree((error3, result3) => {
      if (error3) return console.error(error3)
      console.log(result3)
    })
  })
})
