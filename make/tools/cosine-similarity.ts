export function computeCosineSimilarity(
  v1: Array<number>,
  v2: Array<number>,
): number {
  let dotProduct = 0
  let normA = 0
  let normB = 0

  for (let i = 0; i < v1.length; i++) {
    dotProduct += v1[i]! * v2[i]!
    normA += v1[i]! * v1[i]!
    normB += v2[i]! * v2[i]!
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
}
