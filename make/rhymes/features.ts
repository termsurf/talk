import merge from 'lodash/merge'
import {
  CONSONANT_FEATURE_NAMES,
  ConsonantFeatureName,
  VOWEL_FEATURE_NAMES,
  VowelFeatureName,
} from '~/make/tools/features'

export const VOWELS: Record<string, Float32Array> = {}

const NASALS = [0, 0.4]
const STRESSES = [0, 0.3]

NASALS.forEach(nasalization => {
  STRESSES.forEach(stress => {
    const keys: Array<string> = []
    if (nasalization) {
      keys.push(`&`)
    }
    if (stress) {
      keys.push('^')
    }
    const key = keys.join('')
    merge(VOWELS, {
      [`i${key}`]: vowel({
        closed: 1.0,
        front: 1.0,
        unrounded: 1.0,
        nasalization,
        stress,
      }),
      [`e${key}`]: vowel({
        mid: 1.0,
        front: 1.0,
        unrounded: 1.0,
        nasalization,
        stress,
      }),
      [`a${key}`]: vowel({
        open: 1.0,
        front: 0.5,
        unrounded: 1.0,
        nasalization,
        stress,
      }),
      [`o${key}`]: vowel({
        closed: 1.0,
        mid: 1.0,
        back: 1.0,
        rounded: 1.0,
        nasalization,
        stress,
      }),
      [`u${key}`]: vowel({
        closed: 1.0,
        back: 1.0,
        rounded: 1.0,
        nasalization,
        stress,
      }),
      [`I${key}`]: vowel({
        near: 1.0,
        closed: 1.0,
        front: 1.0,
        unrounded: 1.0,
        nasalization,
        stress,
      }),
      [`E${key}`]: vowel({
        open: 1.0,
        mid: 1.0,
        front: 1.0,
        unrounded: 1.0,
        nasalization,
        stress,
      }),
      [`A${key}`]: vowel({
        near: 1.0,
        open: 1.0,
        front: 1.0,
        unrounded: 0.9,
        nasalization,
        stress,
      }),
      [`O${key}`]: vowel({
        near: 1.0,
        mid: 1.0,
        back: 1.0,
        unrounded: 1.0,
        nasalization,
        stress,
      }),
      [`U${key}`]: vowel({
        mid: 1.0,
        central: 1.0,
        nasalization,
        stress,
      }),
      [`i$${key}`]: vowel({
        front: 1.0,
        closed: 1.0,
        rounded: 1.0,
        nasalization,
        stress,
      }),
      [`e$${key}`]: vowel({
        closed: 1.0,
        mid: 1.0,
        front: 1.0,
        rounded: 1.0,
        nasalization,
        stress,
      }),
      [`a$${key}`]: vowel({
        open: 1.0,
        mid: 1.0,
        front: 1.0,
        rounded: 1.0,
        nasalization,
        stress,
      }),
      [`o$${key}`]: vowel({
        open: 1.0,
        mid: 1.0,
        back: 1.0,
        rounded: 1.0,
        nasalization,
        stress,
      }),
      [`u$${key}`]: vowel({
        open: 1.0,
        mid: 1.0,
        central: 1.0,
        unrounded: 1.0,
        nasalization,
        stress,
      }),
    })
  })
})

export const VOWEL_KEYS = Object.keys(VOWELS)

export const VOWEL_VECTOR_PLACEHOLDER = vowel()

// https://en.wikipedia.org/wiki/IPA_consonant_chart_with_audio
export const CONSONANTS: Record<string, Float32Array> = {
  m: consonant({ bilabial: 0.9, nasal: 1.0 }),
  N: consonant({ retroflex: 1.0, nasal: 0.8 }),
  n: consonant({ alveolar: 1.0, nasal: 0.9 }),
  q: consonant({ velar: 1.0, nasal: 0.8 }),
  'G~': consonant({ velarization: 1.0 }),
  G: consonant({ velar: 1.0, fricative: 0.8 }),
  'g?': consonant({ plosive: 1.0, velar: 1.0, implosive: 0.5 }),
  g: consonant({ plosive: 1.0, velar: 1.0 }),
  "'": consonant({ plosive: 1.0, glottal: 0.9 }),
  Q: consonant({ pharyngeal: 1.0, fricative: 0.9 }),
  'd?': consonant({ dental: 1.0, plosive: 1.0, implosive: 0.5 }),
  'd!': consonant({ dental: 1.0, plosive: 1.0, ejective: 0.5 }),
  'd*': consonant({ click: 1.0 }),
  'd.': consonant({ dental: 1.0, plosive: 1.0, stop: 0.2 }),
  D: consonant({ dental: 1.0, retroflex: 0.9, plosive: 1.0 }),
  'dQ~': consonant({
    dental: 1.0,
    plosive: 1.0,
    pharyngealization: 0.8,
  }),
  d: consonant({ dental: 1.0, plosive: 1.0 }),
  'b?': consonant({
    bilabial: 1.0,
    voiced: 1.0,
    plosive: 1.0,
    implosive: 0.5,
  }),
  'b!': consonant({
    bilabial: 1.0,
    voiced: 1.0,
    plosive: 1.0,
    ejective: 0.5,
  }),
  b: consonant({ bilabial: 1.0, voiced: 1.0, plosive: 1.0 }),
  'p!': consonant({ bilabial: 1.0, plosive: 1.0, ejective: 0.5 }),
  'p*': consonant({ bilabial: 1.0, click: 1.0 }),
  'p.': consonant({ bilabial: 1.0, plosive: 1.0, stop: 0.2 }),
  'p@': consonant({ bilabial: 1.0, plosive: 1.0, tense: 0.1 }),
  p: consonant({ bilabial: 1.0, plosive: 1.0 }),
  'T!': consonant({ plosive: 1.0, retroflex: 0.9, ejective: 0.5 }),
  T: consonant({ plosive: 1.0 }),
  't!': consonant({ alveolar: 1.0, plosive: 1.0, ejective: 0.5 }),
  't*': consonant({ click: 1.0 }),
  'tQ~': consonant({
    alveolar: 1.0,
    plosive: 1.0,
    pharyngealization: 0.8,
  }),
  't@': consonant({ alveolar: 1.0, plosive: 1.0, tense: 0.1 }),
  't.': consonant({ alveolar: 1.0, plosive: 1.0, stop: 0.2 }),
  t: consonant({ alveolar: 1.0, plosive: 1.0 }),
  'k!': consonant({ velar: 1.0, plosive: 1.0, ejective: 0.5 }),
  'k.': consonant({ velar: 1.0, plosive: 1.0, stop: 0.2 }),
  'k*': consonant({ click: 1.0 }),
  'K!': consonant({ uvular: 1.0, plosive: 1.0, ejective: 0.5 }),
  K: consonant({ uvular: 1.0, plosive: 1.0 }),
  k: consonant({ velar: 1.0, plosive: 1.0 }),
  'H!': consonant({ uvular: 1.0, fricative: 1.0, ejective: 0.5 }),
  H: consonant({ uvular: 1.0, fricative: 1.0 }),
  'h~': consonant({ aspiration: 0.5 }),
  'h!': consonant({ glottal: 1.0, fricative: 1.0, ejective: 0.5 }),
  h: consonant({ glottal: 1.0, fricative: 1.0 }),
  J: consonant({ sibilant: 1.0, fricative: 1.0, retroflex: 0.8 }),
  'j!': consonant({ postalveolar: 1.0, sibilant: 1.0, fricative: 1.0 }),
  j: consonant({ postalveolar: 1.0, sibilant: 1.0, fricative: 1.0 }),
  'S!': consonant({ lateral: 1.0, fricative: 1.0, alveolar: 1.0 }),
  's!': consonant({
    sibilant: 1.0,
    fricative: 1.0,
    alveolar: 1.0,
    ejective: 0.5,
  }),
  S: consonant({ lateral: 1.0, fricative: 1.0, alveolar: 1.0 }),
  'sQ~': consonant({
    sibilant: 1.0,
    fricative: 1.0,
    alveolar: 1.0,
    pharyngealization: 0.8,
  }),
  's@': consonant({
    alveolar: 1.0,
    sibilant: 1.0,
    fricative: 1.0,
    tense: 0.1,
  }),
  s: consonant({ alveolar: 1.0, sibilant: 1.0, fricative: 1.0 }),
  F: consonant({ bilabial: 1.0, fricative: 1.0 }),
  'f!': consonant({ fricative: 1.0, ejective: 0.5 }),
  f: consonant({ labiodental: 1.0, fricative: 1.0 }),
  V: consonant({ bilabial: 1.0, voiced: 1.0, fricative: 1.0 }),
  v: consonant({ labiodental: 1.0, voiced: 1.0, fricative: 1.0 }),
  'z!': consonant({ sibilant: 1.0, fricative: 1.0, ejective: 0.5 }),
  'zQ~': consonant({
    sibilant: 1.0,
    fricative: 1.0,
    pharyngealization: 0.8,
  }),
  z: consonant({ sibilant: 1.0, fricative: 1.0 }),
  'Z!': consonant({
    lateral: 1.0,
    fricative: 1.0,
    alveolar: 1.0,
    ejective: 0.5,
  }),
  Z: consonant({ lateral: 1.0, alveolar: 1.0, fricative: 1.0 }),
  'CQ~': consonant({
    affricate: 1.0,
    dental: 1.0,
    pharyngealization: 0.8,
  }),
  C: consonant({ affricate: 1.0, dental: 1.0 }),
  'cQ~': consonant({
    affricate: 1.0,
    dental: 1.0,
    pharyngealization: 0.8,
  }),
  c: consonant({ affricate: 1.0, dental: 1.0 }),
  L: consonant({ lateral: 1.0, approximant: 1.0, retroflex: 0.8 }),
  'l*': consonant({ click: 1.0 }),
  'lQ~': consonant({
    lateral: 1.0,
    approximant: 1.0,
    pharyngealization: 0.8,
  }),
  l: consonant({ lateral: 1.0, approximant: 1.0 }),
  R: consonant({ tap: 1.0, retroflex: 1.0 }),
  'rQ~': consonant({ tap: 1.0, alveolar: 1.0, pharyngealization: 0.8 }),
  r: consonant({ tap: 1.0, alveolar: 1.0 }),
  'x!': consonant({
    postalveolar: 1.0,
    sibilant: 1.0,
    fricative: 1.0,
    ejective: 0.5,
  }),
  'X!': consonant({
    postalveolar: 1.0,
    sibilant: 1.0,
    fricative: 1.0,
    retroflex: 0.8,
    ejective: 0.5,
  }),
  X: consonant({
    postalveolar: 1.0,
    sibilant: 1.0,
    fricative: 1.0,
    retroflex: 0.8,
  }),
  'x@': consonant({
    postalveolar: 1.0,
    sibilant: 1.0,
    fricative: 1.0,
    tense: 0.1,
  }),
  x: consonant({
    postalveolar: 1.0,
    sibilant: 1.0,
    fricative: 1.0,
  }),
  W: consonant({
    fricative: 1.0,
    approximant: 1.0,
    coarticulated: 1.0,
  }),
  'w!': consonant({
    fricative: 1.0,
    approximant: 1.0,
    coarticulated: 1.0,
    ejective: 0.5,
  }),
  'w~': consonant({
    fricative: 1.0,
    approximant: 1.0,
    coarticulated: 1.0,
    labialization: 0.9,
  }),
  w: consonant({
    fricative: 1.0,
    approximant: 1.0,
    coarticulated: 1.0,
  }),
  'y~': consonant({
    palatalization: 1.0,
  }),
  y: consonant({
    palatal: 1.0,
    approximant: 1.0,
  }),
}

export const CONSONANT_KEYS = Object.keys(CONSONANTS)

export const CONSONANT_VECTOR_PLACEHOLDER = consonant()

function consonant(
  mappings: Partial<Record<ConsonantFeatureName, number>> = {},
) {
  const consonant = new Float32Array(CONSONANT_FEATURE_NAMES.length)
  CONSONANT_FEATURE_NAMES.forEach((name, i) => {
    const number =
      name in mappings
        ? typeof mappings[name] === 'number'
          ? mappings[name]
          : mappings[name] === true
          ? 1
          : 0
        : 0
    consonant[i] = number
  })
  return consonant
}

function vowel(
  mappings: Partial<Record<VowelFeatureName, number>> = {},
) {
  const consonant = new Float32Array(VOWEL_FEATURE_NAMES.length)
  VOWEL_FEATURE_NAMES.forEach((name, i) => {
    const number =
      name in mappings
        ? typeof mappings[name] === 'number'
          ? mappings[name]
          : mappings[name] === true
          ? 1
          : 0
        : 0
    consonant[i] = number
  })
  return consonant
}

// function logSimilarity(key, a, b) {
//   console.log(key, cosineSimilarity(a.consonant, b.consonant))
// }

// function logData(key, data) {
//   console.log(key.padEnd(4, ' '), data.consonant.join(''))
//   console.log(`  ${JSON.stringify(data.map)}`)
// }

// console.log(Object.keys(CONSONANTS).join('\n'))
