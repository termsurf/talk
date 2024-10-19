export const VECTOR_DIMENSION = 6

// form(pharyngealization, aspriation, ejective, implosive, stop, tense)
export const CONSONANT_FORM = [
  'aspiration',
  'dentalization',
  'glottalization',
  'labialization',
  'nasalization',
  'palatalization',
  'pharyngealization',
  'stop',
  'tense',
  'velarization',
] as const

export type ConsonantForm = typeof CONSONANT_FORM[number]

// flow(plosive, fricative)
export const CONSONANT_MOLD = [
  'affricate',
  'approximant',
  'fricative',
  'lateral-approximant',
  'lateral-fricative',
  'nasal',
  'plosive',
  'sibilant',
  'sibilant-fricative',
  'tap',
] as const

export type ConsonantMold = typeof CONSONANT_MOLD[number]

// site(bilabial)
export const CONSONANT_SITE = [
  'alveolar',
  'bilabial',
  'click',
  'dental',
  'glottal',
  'labiodental',
  'labiovelar',
  'lateral',
  'palatal',
  'pharyngeal',
  'postalveolar',
  'retroflex',
  'uvular',
  'velar',
] as const

export type ConsonantSite = typeof CONSONANT_SITE[number]

export const CONSONANT_FLOW = [
  'standard',
  'ejective',
  'implosive',
  'click',
] as const

export type ConsonantFlow = typeof CONSONANT_FLOW[number]

// tone(voiced / unvoiced)
export const CONSONANT_TONE = ['voiced', 'unvoiced'] as const

export type ConsonantTone = typeof CONSONANT_TONE[number]

// length (short, long/geminate)
export const CONSONANT_TIME = ['standard', 'long'] as const

export type ConsonantTime = typeof CONSONANT_TIME[number]

// Consonant === Beat
export type Consonant = {
  form?: ConsonantForm
  mold?: ConsonantMold
  flow?: ConsonantFlow
  site?: ConsonantSite
  tone?: ConsonantTone
  time?: ConsonantTime
}

export type ConsonantFeatureName = keyof Consonant

export const CONSONANT_FEATURE_WEIGHTS: Record<
  ConsonantFeatureName,
  Record<string, number>
> = {
  form: {
    aspiration: 0.7,
    coarticulation: 0.5,
    dentalization: 0.6,
    glottalization: 0.8,
    labialization: 0.6,
    nasalization: 0.9,
    palatalization: 0.5,
    pharyngealization: 0.8,
    stop: 1.0,
    tense: 0.7,
    velarization: 0.6,
  },
  mold: {
    affricate: 0.8,
    approximant: 0.5,
    fricative: 1.0,
    'lateral-approximant': 0.9,
    'lateral-fricative': 0.9,
    nasal: 0.9,
    plosive: 1.0,
    sibilant: 0.7,
    'sibilant-fricative': 0.7,
    tap: 0.6,
  },
  site: {
    alveolar: 0.7,
    bilabial: 0.6,
    click: 1.0,
    dental: 0.8,
    glottal: 0.9,
    labiodental: 0.7,
    labiovelar: 0.7,
    lateral: 0.6,
    palatal: 0.7,
    pharyngeal: 0.9,
    postalveolar: 0.6,
    retroflex: 0.8,
    uvular: 0.8,
    velar: 0.7,
  },
  flow: {
    standard: 1.0,
    ejective: 0.9,
    implosive: 0.8,
    click: 0.7,
  },
  tone: {
    voiced: 1.0,
    unvoiced: 0.7,
  },
  time: {
    standard: 1.0,
    long: 0.5,
  },
} as const

export const VOWEL_ROOM = [
  'closed',
  'near-closed',
  'middle-closed',
  'middle',
  'middle-open',
  'near-open',
  'open',
] as const

export type VowelRoom = typeof VOWEL_ROOM[number]

// (rounded (tense)/unrounded (lax))
export const VOWEL_FLEX = ['rounded', 'unrounded'] as const

export type VowelFlex = typeof VOWEL_FLEX[number]

// (front, mid, back)
export const VOWEL_SITE = ['front', 'center', 'back'] as const

export type VowelSite = typeof VOWEL_SITE[number]

// stress
export const VOWEL_KICK = ['standard', 'stress'] as const

export type VowelKick = typeof VOWEL_KICK[number]

// nasal/oral
export const VOWEL_NOSE = ['oral', 'nasal'] as const

export type VowelNose = typeof VOWEL_NOSE[number]

// length
export const VOWEL_TIME = ['standard', 'long', 'short'] as const

export type VowelTime = typeof VOWEL_TIME[number]

// Vowel === Tune
export type Vowel = {
  room?: VowelRoom
  flex?: VowelFlex
  site?: VowelSite
  kick?: VowelKick
  nose?: VowelNose
  time?: VowelTime
}

export type VowelFeatureName = keyof Vowel

export const VOWEL_FEATURE_WEIGHTS: Record<
  VowelFeatureName,
  Record<string, number>
> = {
  room: {
    closed: 1.0,
    'near-closed': 0.8,
    'middle-closed': 0.7,
    middle: 0.5,
    'middle-open': 0.6,
    'near-open': 0.8,
    open: 1.0,
  },
  flex: {
    rounded: 1.0,
    unrounded: 0.8,
  },
  site: {
    front: 0.7,
    center: 0.5,
    back: 0.9,
  },
  kick: {
    standard: 1.0,
    stress: 0.8,
  },
  nose: {
    oral: 1.0,
    nasal: 0.9,
  },
  time: {
    standard: 1.0,
    long: 0.8,
    short: 0.7,
  },
} as const
