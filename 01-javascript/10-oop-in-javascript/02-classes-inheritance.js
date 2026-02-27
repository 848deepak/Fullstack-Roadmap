class Animal {
  constructor(name) {
    this.name = name
  }

  speak() {
    return `${this.name} makes a sound`
  }
}

class Dog extends Animal {
  speak() {
    return `${this.name} barks`
  }
}

const dog = new Dog('Bruno')
console.log(dog.speak())
