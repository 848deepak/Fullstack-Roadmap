class Account {
  #balance = 0 // private field = encapsulation

  deposit(amount) {
    this.#balance += amount
  }

  getBalance() {
    return this.#balance
  }

  static bankName() {
    return 'JavaScript Bank'
  }
}

class SavingsAccount extends Account {
  // Polymorphism: overridden method behavior (same interface, specialized output)
  getBalance() {
    return `Savings balance: ${super.getBalance()}`
  }
}

const account = new SavingsAccount()
account.deposit(1000)
console.log(account.getBalance())
console.log(Account.bankName())
