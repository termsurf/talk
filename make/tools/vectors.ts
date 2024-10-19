import { CONSONANTS } from '~/make/rhymes/features'

export function normalizeVector(vector: Float32Array): Float32Array {
  const max = Math.max(...vector)
  if (max === 0) {
    return vector
  } // Avoid division by zero if the vector is all zeros.
  return vector.map(value => value / max)
}
