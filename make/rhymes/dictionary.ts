import { VECTOR_DIMENSION } from '~/make/tools/features'
import buildConsonantClusterGraph, {
  ClusterGraph,
  ConsonantCluster,
} from '~/make/rhymes/cluster-graph'

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

  private units: Map<string, PhoneticFeatureVector>

  private clusterGraph: ClusterGraph

  private indexBuilt: boolean = false

  constructor({
    units,
    clusters,
    similarityThreshold = 0.2,
  }: {
    units: Map<string, PhoneticFeatureVector>
    clusters: Array<Array<string>>
    similarityThreshold: number
  }) {
    this.units = units
    this.wordToPhonemes = new Map()
    this.phonemesToWords = new Map()
    this.lengthBasedSimilarityIndex = new Map()
    this.globalSimilarityIndex = new Map()
    this.clusterGraph = buildConsonantClusterGraph({
      clusters,
      units,
      similarityThreshold,
    })
  }

  insert(word: Word, phonemes: PhonemeSequence): void {
    this.wordToPhonemes.set(word, phonemes)
    if (!this.phonemesToWords.has(phonemes)) {
      this.phonemesToWords.set(phonemes, new Set())
    }
    this.phonemesToWords.get(phonemes)!.add(word)
    this.indexBuilt = false // Mark index as outdated
  }

  index(): void {
    console.time('Building Index')
    this.lengthBasedSimilarityIndex.clear()
    this.globalSimilarityIndex.clear()
    const phonemeSequences = Array.from(this.phonemesToWords.keys())

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
            const similarity = this.calculateSequenceSimilarity(
              sequences[i]!,
              sequences[j]!,
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
          const similarity = this.calculateSequenceSimilarity(
            phonemeSequences[i]!,
            phonemeSequences[j]!,
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
        'Index not built. Call index() before searching for rhymes.',
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

  private calculateSequenceSimilarity(
    seq1: PhonemeSequence,
    seq2: PhonemeSequence,
  ): number {
    const phonemes1 = seq1.split(' ')
    const phonemes2 = seq2.split(' ')
    const matrix = this.createAlignmentMatrix(phonemes1, phonemes2)
    const alignmentScore = matrix[phonemes1.length]![phonemes2.length]!

    // Normalize the score by the length of the longer sequence
    const maxLength = Math.max(phonemes1.length, phonemes2.length)
    return alignmentScore / maxLength
  }

  private createAlignmentMatrix(
    seq1: Array<string>,
    seq2: Array<string>,
  ): Array<Array<number>> {
    const matrix: Array<Array<number>> = Array(seq1.length + 1)
      .fill(null)
      .map(() => Array<number>(seq2.length + 1).fill(0))

    // Initialize first row and column
    for (let i = 1; i <= seq1.length; i++) {
      matrix[i]![0] = matrix[i - 1]![0]! - 1
    }
    for (let j = 1; j <= seq2.length; j++) {
      matrix[0]![j] = matrix[0]![j - 1]! - 1
    }

    // Fill the matrix
    for (let i = 1; i <= seq1.length; i++) {
      for (let j = 1; j <= seq2.length; j++) {
        const match = this.calculatePhonemeOrClusterSimilarity(
          seq1[i - 1]!,
          seq2[j - 1]!,
        )
        matrix[i]![j] = Math.max(
          matrix[i - 1]![j - 1]! + match,
          matrix[i - 1]![j]! - 1,
          matrix[i]![j - 1]! - 1,
        )
      }
    }

    return matrix
  }

  private calculatePhonemeOrClusterSimilarity(
    p1: string,
    p2: string,
  ): number {
    // Check if p1 and p2 are clusters
    const cluster1 = this.clusterGraph.clusters.get(p1)
    const cluster2 = this.clusterGraph.clusters.get(p2)

    if (cluster1 && cluster2) {
      // If both are clusters, use cluster similarity
      return this.calculateClusterSimilarity(
        cluster1.vector,
        cluster2.vector,
      )
    } else {
      // If not clusters, calculate similarity based on phonetic feature vectors
      const vec1 =
        this.units.get(p1) ||
        new Array<number>(VECTOR_DIMENSION).fill(0)
      const vec2 =
        this.units.get(p2) ||
        new Array<number>(VECTOR_DIMENSION).fill(0)
      return this.calculateSimilarity(vec1, vec2)
    }
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

  private calculateClusterSimilarity(
    a: PhoneticFeatureVector,
    b: PhoneticFeatureVector,
  ): number {
    // Find the most similar clusters for vectors a and b
    const clusterA = this.findMostSimilarCluster(a)
    const clusterB = this.findMostSimilarCluster(b)

    if (clusterA && clusterB) {
      // Check if there's an edge between these clusters
      const edge = this.clusterGraph.edges.find(
        e =>
          (e.from === clusterA.id && e.to === clusterB.id) ||
          (e.from === clusterB.id && e.to === clusterA.id),
      )

      if (edge) {
        return edge.weight
      }
    }

    // If no cluster similarity found, calculate cosine similarity
    return this.calculateSimilarity(a, b)
  }

  private findMostSimilarCluster(
    vector: PhoneticFeatureVector,
  ): ConsonantCluster | undefined {
    let mostSimilarCluster: ConsonantCluster | undefined
    let highestSimilarity = -1

    for (const cluster of this.clusterGraph.clusters.values()) {
      const similarity = this.calculateSimilarity(
        vector,
        cluster.vector,
      )

      if (similarity > highestSimilarity) {
        highestSimilarity = similarity
        mostSimilarCluster = cluster
      }
    }

    return mostSimilarCluster
  }
}
