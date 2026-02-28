const person = { name: 'Deepak' }

function intro(city, country) {
  return `${this.name} from ${city}, ${country}`
}

console.log(intro.call(person, 'Chandigarh', 'India'))
console.log(intro.apply(person, ['Delhi', 'India']))

const boundIntro = intro.bind(person, 'Mumbai', 'India')
console.log(boundIntro())
