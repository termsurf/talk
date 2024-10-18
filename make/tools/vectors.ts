import {
  CONSONANT_VECTOR_PLACEHOLDER,
  CONSONANTS,
} from '~/make/rhymes/features'

export function combineConsonantClusterVectors(
  clusters: Array<string>,
): Float32Array {
  const vector = new Float32Array(CONSONANT_VECTOR_PLACEHOLDER.length)

  clusters.forEach(cluster => {
    const consonantVector =
      CONSONANTS[cluster] ||
      new Float32Array(CONSONANT_VECTOR_PLACEHOLDER.length)

    for (let i = 0; i < vector.length; i++) {
      vector[i]! += consonantVector[i]!
    }
  })

  return normalizeVector(vector)
}

export function normalizeVector(vector: Float32Array): Float32Array {
  const max = Math.max(...vector)
  if (max === 0) {
    return vector
  } // Avoid division by zero if the vector is all zeros.
  return vector.map(value => value / max)
}
