function User(name) {
  this.name = name
}

User.prototype.sayName = function () {
  return `Hi, I am ${this.name}`
}

const user = new User('Deepak')
console.log(user.sayName())

// Prototype chain check
console.log(Object.getPrototypeOf(user) === User.prototype)
