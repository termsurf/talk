import { VECTOR_DIMENSION } from '../tools/features'

type PhonemeSequence = string

type Word = string

type PhoneticFeatureVector = Array<number>

export default class RhymeDictionary {
  private wordToPhonemes: Map<Word, PhonemeSequence>

  private phonemesToWords: Map<PhonemeSequence, Set<Word>>

  private lengthBasedSimilarityIndex: Map<
    number,
    Map<PhonemeSequence, Array<[PhonemeSequence, number]>>
  >

  private globalSimilarityIndex: Map<
    PhonemeSequence,
    Array<[PhonemeSequence, number]>
  >

  private phoneticUnits: Map<string, PhoneticFeatureVector>

  private indexBuilt: boolean = false

  constructor(phoneticUnits: Map<string, PhoneticFeatureVector>) {
    this.phoneticUnits = phoneticUnits
    this.wordToPhonemes = new Map()
    this.phonemesToWords = new Map()
    this.lengthBasedSimilarityIndex = new Map()
    this.globalSimilarityIndex = new Map()
  }

  insert(word: Word, phonemes: PhonemeSequence): void {
    this.wordToPhonemes.set(word, phonemes)
    if (!this.phonemesToWords.has(phonemes)) {
      this.phonemesToWords.set(phonemes, new Set())
    }
    this.phonemesToWords.get(phonemes)!.add(word)
    this.indexBuilt = false // Mark index as outdated
  }

  bulkInsert(words: Array<[Word, PhonemeSequence]>): void {
    for (const [word, phonemes] of words) {
      this.insert(word, phonemes)
    }
    this.indexBuilt = false // Mark index as outdated
  }

  buildIndex(): void {
    console.time('Building Index')
    this.lengthBasedSimilarityIndex.clear()
    this.globalSimilarityIndex.clear()
    const phonemeSequences = Array.from(this.phonemesToWords.keys())
    const vectors = phonemeSequences.map(
      this.phonemeSequenceToVector.bind(this),
    )

    // Group phoneme sequences by length
    const lengthGroups = new Map<number, Array<PhonemeSequence>>()
    for (const sequence of phonemeSequences) {
      const length = sequence.split(' ').length
      if (!lengthGroups.has(length)) {
        lengthGroups.set(length, [])
      }
      lengthGroups.get(length)!.push(sequence)
    }

    // Build length-based similarity index
    for (const [length, sequences] of lengthGroups) {
      const lengthSimilarityIndex = new Map<
        PhonemeSequence,
        Array<[PhonemeSequence, number]>
      >()

      for (let i = 0; i < sequences.length; i++) {
        const similarities: Array<[PhonemeSequence, number]> = []
        for (let j = 0; j < sequences.length; j++) {
          if (i !== j) {
            const similarity = this.calculateSimilarity(
              vectors[phonemeSequences.indexOf(sequences[i]!)]!,
              vectors[phonemeSequences.indexOf(sequences[j]!)]!,
            )
            similarities.push([sequences[j]!, similarity])
          }
        }
        similarities.sort((a, b) => b[1] - a[1])
        lengthSimilarityIndex.set(sequences[i]!, similarities)
      }

      this.lengthBasedSimilarityIndex.set(length, lengthSimilarityIndex)
    }

    // Build global similarity index
    for (let i = 0; i < phonemeSequences.length; i++) {
      const similarities: Array<[PhonemeSequence, number]> = []
      for (let j = 0; j < phonemeSequences.length; j++) {
        if (i !== j) {
          const similarity = this.calculateSimilarity(
            vectors[i]!,
            vectors[j]!,
          )
          similarities.push([phonemeSequences[j]!, similarity])
        }
      }
      similarities.sort((a, b) => b[1] - a[1])
      this.globalSimilarityIndex.set(phonemeSequences[i]!, similarities)
    }

    this.indexBuilt = true
    console.timeEnd('Building Index')
  }

  search(
    word: Word,
    page: number,
    pageSize: number,
    length?: number,
  ): { rhymes: Array<Word>; totalCount: number } {
    if (!this.indexBuilt) {
      throw new Error(
        'Index not built. Call buildIndex() before searching for rhymes.',
      )
    }

    const phonemes = this.wordToPhonemes.get(word)
    if (!phonemes) {
      return { rhymes: [], totalCount: 0 }
    }

    let similarPhonemes: Array<[PhonemeSequence, number]>

    if (length !== undefined) {
      const similarityGroup =
        this.lengthBasedSimilarityIndex.get(length)
      if (!similarityGroup || !similarityGroup.has(phonemes)) {
        return { rhymes: [], totalCount: 0 }
      }
      similarPhonemes = similarityGroup.get(phonemes)!
    } else {
      similarPhonemes = this.globalSimilarityIndex.get(phonemes) || []
    }

    const rhymes: Array<Word> = []
    let totalCount = 0
    const startIndex = (page - 1) * pageSize

    for (const [currentPhonemes, _] of similarPhonemes) {
      const words = Array.from(
        this.phonemesToWords.get(currentPhonemes) || [],
      )
      for (const rhyme of words) {
        if (rhyme !== word) {
          if (totalCount >= startIndex && rhymes.length < pageSize) {
            rhymes.push(rhyme)
          }
          totalCount++
        }
      }

      if (rhymes.length === pageSize) {
        break
      }
    }

    return { rhymes, totalCount }
  }

  private phonemeSequenceToVector(
    sequence: PhonemeSequence,
  ): PhoneticFeatureVector {
    const phonemes = sequence.split(' ')
    const vectors = phonemes.map(
      p =>
        this.phoneticUnits.get(p) ||
        Array<number>(VECTOR_DIMENSION).fill(0),
    )

    return vectors
      .reduce(
        (acc, vec) => acc.map((v, i) => v + vec[i]!),
        new Array<number>(VECTOR_DIMENSION).fill(0),
      )
      .map(v => v / phonemes.length)
  }

  private calculateSimilarity(
    a: PhoneticFeatureVector,
    b: PhoneticFeatureVector,
  ): number {
    let dotProduct = 0
    let normA = 0
    let normB = 0

    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i]! * b[i]!
      normA += a[i]! * a[i]!
      normB += b[i]! * b[i]!
    }

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
  }
}
