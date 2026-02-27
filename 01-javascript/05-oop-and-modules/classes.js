// Class-based model for understanding OOP in JavaScript.
class BankAccount {
  constructor(holder, balance = 0) {
    this.holder = holder
    this.balance = balance
  }

  deposit(amount) {
    this.balance += amount
    return this.balance
  }

  withdraw(amount) {
    // Guard clause for invalid operation.
    if (amount > this.balance) return 'Insufficient funds'
    this.balance -= amount
    return this.balance
  }
}

const account = new BankAccount('Deepak', 1500)
console.log('After deposit:', account.deposit(500))
console.log('After withdraw:', account.withdraw(600))
