// Queue follows FIFO (First In, First Out).
class Queue {
  constructor() {
    this.items = []
  }

  enqueue(value) {
    // Add item to rear.
    this.items.push(value)
  }

  dequeue() {
    // Remove item from front.
    return this.items.shift()
  }
}

const queue = new Queue()
queue.enqueue('A')
queue.enqueue('B')
console.log('Dequeue:', queue.dequeue())
