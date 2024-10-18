export function weightedJaccard(
  a: Float32Array,
  b: Float32Array,
): number {
  let intersectionSum = 0
  let unionSum = 0

  for (let i = 0; i < a.length; i++) {
    const valueA = a[i]!
    const valueB = b[i]!

    // Weighted Intersection: take the minimum of both values
    intersectionSum += Math.min(valueA, valueB)

    // Weighted Union: take the maximum of both values
    unionSum += Math.max(valueA, valueB)
  }

  // Return the Jaccard similarity, or 0 if the union is 0 to avoid division by zero
  return unionSum === 0 ? 0 : intersectionSum / unionSum
}
