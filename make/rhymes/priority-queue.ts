export default class PriorityQueue<T> {
  private heap: Array<T>

  private compare: (a: T, b: T) => number

  constructor(compareFunction: (a: T, b: T) => number) {
    this.heap = []
    this.compare = compareFunction
  }

  enqueue(element: T): void {
    this.heap.push(element)
    this.bubbleUp(this.heap.length - 1)
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined
    }
    const root = this.heap[0]
    const last = this.heap.pop()!
    if (this.heap.length > 0) {
      this.heap[0] = last
      this.bubbleDown(0)
    }
    return root
  }

  peek(): T | undefined {
    return this.heap[0]
  }

  isEmpty(): boolean {
    return this.heap.length === 0
  }

  size(): number {
    return this.heap.length
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2)
      if (
        this.compare(this.heap[index]!, this.heap[parentIndex]!) < 0
      ) {
        this.swap(index, parentIndex)
        index = parentIndex
      } else {
        break
      }
    }
  }

  private bubbleDown(index: number): void {
    while (true) {
      const leftChild = 2 * index + 1
      const rightChild = 2 * index + 2
      let minIndex = index

      if (
        leftChild < this.heap.length &&
        this.compare(this.heap[leftChild]!, this.heap[minIndex]!) < 0
      ) {
        minIndex = leftChild
      }

      if (
        rightChild < this.heap.length &&
        this.compare(this.heap[rightChild]!, this.heap[minIndex]!) < 0
      ) {
        minIndex = rightChild
      }

      if (minIndex !== index) {
        this.swap(index, minIndex)
        index = minIndex
      } else {
        break
      }
    }
  }

  private swap(i: number, j: number): void {
    ;[this.heap[i], this.heap[j]] = [this.heap[j]!, this.heap[i]!]
  }
}
