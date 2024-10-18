export const CONSONANT_FEATURE_NAMES = [
  'affricate',
  'alveolar',
  'approximant',
  'aspiration',
  'bilabial',
  'click',
  'coarticulated',
  'dental',
  'dentalization',
  'ejective',
  'fricative',
  'glottal',
  'glottalization',
  'implosive',
  'labialization',
  'labiodental',
  'labiovelar',
  'lateral',
  'nasal',
  'nasalization',
  'palatal',
  'palatalization',
  'pharyngeal',
  'pharyngealization',
  'plosive',
  'postalveolar',
  'retroflex',
  'sibilant',
  'stop',
  'tap',
  'tense',
  'uvular',
  'velar',
  'velarization',
  'voiced',
] as const

export type ConsonantFeatureName =
  typeof CONSONANT_FEATURE_NAMES[number]

export type ConsonantWithFeatures = Partial<
  Record<ConsonantFeatureName, number>
>

export const VOWEL_FEATURE_NAMES = [
  'back', // Back vowel (tongue towards the back)
  'central', // Central vowel (tongue in the center)
  'front', // Front vowel (tongue towards the front)
  'closed', // High tongue position
  'long', // Vowel length (long or short)
  'open', // Low tongue position
  'mid', // Mid tongue position
  'nasalization', // Whether the vowel is nasalized
  'rounded', // Whether the lips are rounded
  'stress', // Whether the vowel is stressed
  'unrounded',
  'near',
] as const

export type VowelFeatureName = typeof VOWEL_FEATURE_NAMES[number]

export type VowelWithFeatures = Partial<
  Record<VowelFeatureName, number>
>
