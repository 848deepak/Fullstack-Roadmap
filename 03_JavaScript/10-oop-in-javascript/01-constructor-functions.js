function Vehicle(type) {
  this.type = type
}

Vehicle.prototype.describe = function () {
  return `Vehicle type: ${this.type}`
}

const car = new Vehicle('Car')
console.log(car.describe())
