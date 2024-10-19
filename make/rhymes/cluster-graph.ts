const stringSimWeight = 0.2
const vectorSimWeight = 0.4
const sequenceSimWeight = 0.4

// Define types
type Feature = number

type FeatureVector = Array<Feature>

type PhoneticUnit = {
  id: string
  vector: FeatureVector
}

type ConsonantCluster = {
  id: string
  phonemes: Array<string>
  vector: FeatureVector
}

type ClusterGraph = {
  clusters: Map<string, ConsonantCluster>
  edges: Array<ClusterEdge>
}

type ClusterEdge = {
  from: string
  to: string
  weight: number
}

// Define constants (keep your existing PHONETIC_UNITS constant)

// Helper functions (keep your existing helper functions like jaroWinklerSimilarity, cosineSimilarity, etc.)

function calculateClusterVector(
  phonemes: Array<string>,
  phoneticUnits: Record<string, FeatureVector>,
): FeatureVector {
  const vectors = phonemes.map(p => phoneticUnits[p]!)
  return combineVectors(vectors)
}

function combineVectors(vectors: Array<FeatureVector>): FeatureVector {
  const maxLength = Math.max(...vectors.map(v => v.length))
  const result = new Array(maxLength).fill(0)
  for (const vec of vectors) {
    for (let i = 0; i < vec.length; i++) {
      result[i] += vec[i]
    }
  }
  return result.map(v => v / vectors.length)
}

function calculateSequenceSimilarity(
  seq1: Array<string>,
  seq2: Array<string>,
): number {
  const longerSeq = seq1.length >= seq2.length ? seq1 : seq2
  const shorterSeq = seq1.length < seq2.length ? seq1 : seq2

  // Longest Common Subsequence (LCS)
  const lcsMatrix: Array<Array<number>> = Array(shorterSeq.length + 1)
    .fill(null)
    .map(() => Array<number>(longerSeq.length + 1).fill(0))

  for (let i = 1; i <= shorterSeq.length; i++) {
    for (let j = 1; j <= longerSeq.length; j++) {
      if (shorterSeq[i - 1] === longerSeq[j - 1]) {
        lcsMatrix[i]![j] = lcsMatrix[i - 1]![j - 1]! + 1
      } else {
        lcsMatrix[i]![j] = Math.max(
          lcsMatrix[i - 1]![j]!,
          lcsMatrix[i]![j - 1]!,
        )
      }
    }
  }

  const lcsLength = lcsMatrix[shorterSeq.length]![longerSeq.length]!

  // Position-based weighting
  let positionWeight = 0
  for (let i = 0; i < shorterSeq.length; i++) {
    if (shorterSeq[i] === longerSeq[i]) {
      positionWeight += 1 / (i + 1)
    }
  }
  positionWeight /= shorterSeq.length

  // Combine LCS and position-based similarity
  const lcsSimilarity = lcsLength / longerSeq.length
  const combinedSimilarity = (lcsSimilarity + positionWeight) / 2

  return combinedSimilarity
}

function jaroWinklerSimilarity(s1: string, s2: string): number {
  // Implement Jaro-Winkler similarity
  // This is a simplified version; a full implementation would be more complex
  const maxLength = Math.max(s1.length, s2.length)
  const matchDistance = Math.floor(maxLength / 2) - 1
  const s1Matches: Array<boolean> = new Array(s1.length).fill(false)
  const s2Matches: Array<boolean> = new Array(s2.length).fill(false)
  let matches = 0

  for (let i = 0; i < s1.length; i++) {
    const start = Math.max(0, i - matchDistance)
    const end = Math.min(i + matchDistance + 1, s2.length)

    for (let j = start; j < end; j++) {
      if (!s2Matches[j] && s1[i] === s2[j]) {
        s1Matches[i] = true
        s2Matches[j] = true
        matches++
        break
      }
    }
  }

  if (matches === 0) {
    return 0
  }

  let transpositions = 0
  let j = 0
  for (let i = 0; i < s1.length; i++) {
    if (s1Matches[i]) {
      while (!s2Matches[j]) {
        j++
      }
      if (s1[i] !== s2[j]) {
        transpositions++
      }
      j++
    }
  }

  const jaroSimilarity =
    (matches / s1.length +
      matches / s2.length +
      (matches - transpositions / 2) / matches) /
    3

  const prefixLength = Math.min(4, Math.min(s1.length, s2.length))
  let commonPrefix = 0
  for (let i = 0; i < prefixLength; i++) {
    if (s1[i] === s2[i]) {
      commonPrefix++
    } else {
      break
    }
  }

  return jaroSimilarity + commonPrefix * 0.1 * (1 - jaroSimilarity)
}

function calculateClusterSimilarity(
  cluster1: ConsonantCluster,
  cluster2: ConsonantCluster,
): number {
  const stringSimilarity = jaroWinklerSimilarity(
    cluster1.id,
    cluster2.id,
  )
  const vectorSimilarity = cosineSimilarity(
    cluster1.vector,
    cluster2.vector,
  )
  const sequenceSimilarity = calculateSequenceSimilarity(
    cluster1.phonemes,
    cluster2.phonemes,
  )

  return (
    stringSimWeight * stringSimilarity +
    vectorSimWeight * vectorSimilarity +
    sequenceSimWeight * sequenceSimilarity
  )
}

function cosineSimilarity(a: FeatureVector, b: FeatureVector): number {
  const length = Math.max(a.length, b.length)
  let dotProduct = 0
  let normA = 0
  let normB = 0
  for (let i = 0; i < length; i++) {
    const aVal = a[i] || 0
    const bVal = b[i] || 0
    dotProduct += aVal * bVal
    normA += aVal * aVal
    normB += bVal * bVal
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
}

export default function buildConsonantClusterGraph(
  specifiedClusters: Array<Array<string>>,
  phoneticUnits: Record<string, FeatureVector>,
  similarityThreshold: number,
): ClusterGraph {
  const graph: ClusterGraph = {
    clusters: new Map(),
    edges: [],
  }

  // Create ConsonantCluster objects for each specified cluster
  specifiedClusters.forEach(phonemes => {
    const id = phonemes.join('')
    const cluster: ConsonantCluster = {
      id,
      phonemes,
      vector: calculateClusterVector(phonemes, phoneticUnits),
    }
    graph.clusters.set(id, cluster)
  })

  // Calculate similarities between clusters
  const clusterList = Array.from(graph.clusters.values())
  for (let i = 0; i < clusterList.length; i++) {
    for (let j = i + 1; j < clusterList.length; j++) {
      const similarity = calculateClusterSimilarity(
        clusterList[i]!,
        clusterList[j]!,
      )
      if (similarity >= similarityThreshold) {
        graph.edges.push({
          from: clusterList[i]!.id,
          to: clusterList[j]!.id,
          weight: similarity,
        })
      }
    }
  }

  return graph
}

// // Function to print the graph structure
// function printClusterGraph(graph: ClusterGraph) {
//   console.log('Sequence-Aware Consonant Cluster Analysis Result:')
//   graph.clusters.forEach((cluster, id) => {
//     console.log(`Cluster: ${id}`)
//     console.log(`  Phonemes: ${cluster.phonemes.join(', ')}`)
//     console.log(`  Connections:`)
//     graph.edges
//       .filter(edge => edge.from === id || edge.to === id)
//       .forEach(edge => {
//         const connectedId = edge.from === id ? edge.to : edge.from
//         console.log(
//           `    - ${connectedId} (similarity: ${edge.weight.toFixed(
//             3,
//           )})`,
//         )
//       })
//     console.log()
//   })
// }

// // Usage
// const specifiedClusters = [
//   ['s', 't'],
//   ['s', 'p'],
//   ['t', 'r'],
//   ['k', 'r'],
//   ['s', 'k', 'r'],
//   ['s', 't', 'r'],
//   // Add more specified clusters as needed
// ]

// const clusterGraph = buildClusterGraph(
//   specifiedClusters,
//   PHONETIC_UNITS,
//   0.7,
// )
// printClusterGraph(clusterGraph)
