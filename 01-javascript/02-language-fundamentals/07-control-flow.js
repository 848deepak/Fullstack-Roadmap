const dayNumber = 3

// if / else
if (dayNumber === 1) {
  console.log('Monday')
} else {
  console.log('Not Monday')
}

// switch
switch (dayNumber) {
  case 1:
    console.log('Start of week')
    break
  case 3:
    console.log('Mid week')
    break
  default:
    console.log('Other day')
}

// for loop + continue + break
for (let i = 1; i <= 6; i += 1) {
  if (i === 2) continue
  if (i === 5) break
  console.log('for loop value:', i)
}

// while loop
let count = 0
while (count < 2) {
  console.log('while count:', count)
  count += 1
}

// do-while loop (runs at least once)
let temp = 0
do {
  console.log('do-while value:', temp)
  temp += 1
} while (temp < 1)

// ternary operator
const status = dayNumber > 4 ? 'weekend soon' : 'work day'
console.log('Status:', status)
