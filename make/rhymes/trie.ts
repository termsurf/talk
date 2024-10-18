type WordData = {
  word: string
  weight: number
  phonemeLength: number
}

type QueueItem = {
  node: TrieNode
  cumulativeWeight: number
}

type RhymingPhoneme = {
  phonemes: Array<string>
  weight: number
}

type WeightedWord = {
  word: string
  cumulativeWeight: number
}

class TrieNode {
  children: { [key: string]: TrieNode } = {}

  wordCount: number = 0

  wordList: Array<WordData> = []

  weightSum: number = 0

  minWeight: number = Infinity

  maxWeight: number = -Infinity

  addWord(word: string, weight: number, phonemeLength: number): void {
    this.wordList.push({ word, weight, phonemeLength })
    this.wordCount++
    this.weightSum += weight
    this.minWeight = Math.min(this.minWeight, weight)
    this.maxWeight = Math.max(this.maxWeight, weight)
  }
}

class PhoneticTrie {
  root: TrieNode = new TrieNode()

  insert(word: string, phonemes: Array<string>, weight: number): void {
    let node = this.root
    for (let i = phonemes.length - 1; i >= 0; i--) {
      const phoneme = phonemes[i]!
      if (!node.children[phoneme]) {
        node.children[phoneme] = new TrieNode()
      }
      node = node.children[phoneme]
      node.addWord(word, weight, phonemes.length)
    }
  }

  searchWithPagination(params: {
    phonemes: Array<string>
    limit: number
    page: number
    length?: number
  }): Array<WeightedWord> {
    const { phonemes, limit, page, length } = params
    const rhymingPhonemesArray = this.expandToRhymingPhonemes(phonemes)
    const minHeap = new MinHeap()
    const nodeQueue = new PriorityQueue<QueueItem>()

    for (const rhyme of rhymingPhonemesArray) {
      this._queueInitialNodes(
        rhyme.phonemes,
        this.root,
        rhyme.weight,
        nodeQueue,
      )
    }

    let totalMatches = 0
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    while (!nodeQueue.isEmpty() && minHeap.size() < limit) {
      const { node, cumulativeWeight } = nodeQueue.dequeue()

      if (node.wordCount > 0) {
        const potentialMatches = length
          ? node.wordList.filter(w => w.phonemeLength === length)
          : node.wordList
        const matchCount = potentialMatches.length

        if (totalMatches + matchCount > startIndex) {
          const start = Math.max(0, startIndex - totalMatches)
          const end = Math.min(matchCount, endIndex - totalMatches)

          for (let i = start; i < end; i++) {
            const { word, weight } = potentialMatches[i]!
            minHeap.insert({
              word,
              cumulativeWeight: cumulativeWeight + weight,
            })
          }
        }

        totalMatches += matchCount
        if (totalMatches >= endIndex) {
          break
        }
      }

      for (const [_phoneme, childNode] of Object.entries(
        node.children,
      )) {
        const childWeight = cumulativeWeight + childNode.minWeight
        if (
          minHeap.size() < limit ||
          childWeight < minHeap.peek()!.cumulativeWeight
        ) {
          nodeQueue.enqueue(
            { node: childNode, cumulativeWeight },
            childWeight,
          )
        }
      }
    }

    return minHeap.isolateAllSorted()
  }

  private _queueInitialNodes(
    phonemes: Array<string>,
    node: TrieNode,
    rhymeWeight: number,
    queue: PriorityQueue<QueueItem>,
  ): void {
    let currentNode = node
    for (let i = phonemes.length - 1; i >= 0; i--) {
      const phoneme = phonemes[i]!
      if (!currentNode.children[phoneme]) {
        return
      }
      currentNode = currentNode.children[phoneme]
    }
    queue.enqueue(
      { node: currentNode, cumulativeWeight: rhymeWeight },
      rhymeWeight,
    )
  }

  private expandToRhymingPhonemes(
    phonemes: Array<string>,
  ): Array<RhymingPhoneme> {
    const phonemeSubstitutions: Record<string, Array<string>> = {
      g: ['b', 'k'],
      l: ['r'],
      a: ['æ', 'ʌ'],
      d: ['t', 'th'],
    }

    const generateCombinations = (
      current: Array<string>,
      index: number,
      substitutions: number,
    ): Array<RhymingPhoneme> => {
      if (index === phonemes.length) {
        return [{ phonemes: current, weight: substitutions }]
      }

      const results: Array<RhymingPhoneme> = []
      const currentPhoneme = phonemes[index]!

      // Always include the original phoneme
      results.push(
        ...generateCombinations(
          [...current, currentPhoneme],
          index + 1,
          substitutions,
        ),
      )

      // Include substitutions if available
      if (phonemeSubstitutions[currentPhoneme]) {
        for (const sub of phonemeSubstitutions[currentPhoneme]) {
          results.push(
            ...generateCombinations(
              [...current, sub],
              index + 1,
              substitutions + 1,
            ),
          )
        }
      }

      return results
    }

    const allCombinations = generateCombinations([], 0, 0)

    // Sort combinations by weight (number of substitutions) in ascending order
    allCombinations.sort((a, b) => a.weight - b.weight)

    return allCombinations
  }
}

class MinHeap {
  private heap: Array<WeightedWord> = []

  insert(item: WeightedWord): void {
    this.heap.push(item)
    this._bubbleUp(this.heap.length - 1)
  }

  isolateMin(): WeightedWord | null {
    if (this.heap.length === 0) {
      return null
    }
    if (this.heap.length === 1) {
      return this.heap.pop()!
    }

    const min = this.heap[0]!

    this.heap[0] = this.heap.pop()!
    this._bubbleDown(0)

    return min
  }

  peek(): WeightedWord | null {
    return this.heap[0] || null
  }

  size(): number {
    return this.heap.length
  }

  isolateAllSorted(): Array<{
    word: string
    cumulativeWeight: number
  }> {
    const result: Array<WeightedWord> = []
    while (this.size() > 0) {
      const min = this.isolateMin()
      if (min) {
        result.push(min)
      }
    }
    return result
  }

  private _bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2)
      if (
        this.heap[index]!.cumulativeWeight >=
        this.heap[parentIndex]!.cumulativeWeight
      ) {
        break
      }
      ;[this.heap[index], this.heap[parentIndex]] = [
        this.heap[parentIndex]!,
        this.heap[index]!,
      ]
      index = parentIndex
    }
  }

  private _bubbleDown(index: number): void {
    while (true) {
      let smallest = index
      const leftChild = 2 * index + 1
      const rightChild = 2 * index + 2

      if (
        leftChild < this.heap.length &&
        this.heap[leftChild]!.cumulativeWeight <
          this.heap[smallest]!.cumulativeWeight
      ) {
        smallest = leftChild
      }

      if (
        rightChild < this.heap.length &&
        this.heap[rightChild]!.cumulativeWeight <
          this.heap[smallest]!.cumulativeWeight
      ) {
        smallest = rightChild
      }

      if (smallest === index) {
        break
      }

      ;[this.heap[index], this.heap[smallest]] = [
        this.heap[smallest]!,
        this.heap[index]!,
      ]
      index = smallest
    }
  }
}

class PriorityQueue<T> {
  private queue: Array<{ item: T; priority: number }> = []

  enqueue(item: T, priority: number): void {
    this.queue.push({ item, priority })
    this.queue.sort((a, b) => a.priority - b.priority)
  }

  dequeue(): T {
    return this.queue.shift()!.item
  }

  isEmpty(): boolean {
    return this.queue.length === 0
  }
}

// Usage example
const trie = new PhoneticTrie()
trie.insert('glad', ['g', 'l', 'a', 'd'], 3)
trie.insert('grad', ['g', 'r', 'a', 'd'], 2)
trie.insert('blad', ['b', 'l', 'a', 'd'], 4)
trie.insert('grin', ['g', 'r', 'i', 'n'], 5)

const resultsPage1 = trie.searchWithPagination({
  phonemes: ['g', 'l', 'a', 'd'],
  limit: 4,
  page: 1,
  length: 4,
})

console.log(resultsPage1)
