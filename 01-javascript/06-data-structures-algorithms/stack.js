// Stack follows LIFO (Last In, First Out).
class Stack {
  constructor() {
    this.items = []
  }

  push(value) {
    // Add to top of stack.
    this.items.push(value)
  }

  pop() {
    // Remove from top of stack.
    return this.items.pop()
  }

  peek() {
    return this.items[this.items.length - 1]
  }
}

const stack = new Stack()
stack.push(10)
stack.push(20)
console.log('Peek:', stack.peek())
console.log('Pop:', stack.pop())
