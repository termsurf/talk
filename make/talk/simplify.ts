export enum Simplify {
  VowelNone = 2,
  VowelOne = 3,
  VowelBasic = 4,
  VowelAll = 5,

  ConsonantSimplified = 2,
  ConsonantAll = 3,

  ToneNo = 2,
  ToneYes = 3,

  DurationNo = 2,
  DurationYes = 3,

  AspirationNo = 2,
  AspirationYes = 3,
}

export type SimplifyType = {
  vowel: 'none' | 'one' | 'basic' | 'all'
  consonant: 'all' | 'simplified'
  tone: 'yes' | 'no'
  duration: 'yes' | 'no'
  aspiration: 'yes' | 'no'
}

export type ViewType = {
  text: string
  mass: number
  load: Record<string, string>
}

const VOWEL: Array<SimplifyType['vowel']> = [
  'none',
  'one',
  'basic',
  'all',
]
const CONSONANT: Array<SimplifyType['consonant']> = [
  'all',
  'simplified',
]
const TONE: Array<SimplifyType['tone']> = ['yes', 'no']
const DURATION: Array<SimplifyType['duration']> = ['yes', 'no']
const ASPIRATION: Array<SimplifyType['aspiration']> = ['yes', 'no']

export function read(text: string) {
  const holdBase: Record<string, Array<ViewType>> = {}

  VOWEL.forEach(vowel => {
    CONSONANT.forEach(consonant => {
      TONE.forEach(tone => {
        DURATION.forEach(duration => {
          ASPIRATION.forEach(aspiration => {
            const view = readCase(text, {
              vowel,
              consonant,
              tone,
              duration,
              aspiration,
            })

            const list = (holdBase[view.text] ??= [])
            list.push(view)
          })
        })
      })
    })
  })

  const holdHead: Array<ViewType> = []
  for (const line in holdBase) {
    const list = holdBase[line]
    list?.sort((a, b) => b.mass - a.mass)
    const head = list?.[0]
    if (head) {
      holdHead.push(head)
    }
  }

  holdHead.sort((a, b) => b.mass - a.mass)

  return holdHead
}

export function readCase(
  text: string,
  { vowel, consonant, tone, aspiration, duration }: SimplifyType,
) {
  const view: ViewType = { text, mass: 1, load: {} }

  switch (consonant) {
    case 'simplified': {
      moveToSimplifiedConsonantText(view)
      break
    }
    case 'all': {
      moveToAllConsonantText(view)
      break
    }
  }

  switch (vowel) {
    case 'none': {
      moveToNoVowelText(view)
      break
    }
    case 'one': {
      moveToOneVowelText(view)
      break
    }
    case 'basic': {
      moveToBasicVowelText(view)
      break
    }
    case 'all': {
      moveToAllVowelText(view)
      break
    }
  }

  switch (tone) {
    case 'no': {
      moveToNoToneText(view)
      break
    }
    case 'yes': {
      moveToYesToneText(view)
      break
    }
  }

  switch (aspiration) {
    case 'no': {
      moveToNoAspirationText(view)
      break
    }
    case 'yes': {
      moveToYesAspirationText(view)
      break
    }
  }

  switch (duration) {
    case 'no': {
      moveToNoDurationText(view)
      break
    }
    case 'yes': {
      moveToYesDurationText(view)
      break
    }
  }

  return view
}

function moveToNoDurationText(view: ViewType) {
  const text = view.text.replace(/_/g, '')
  if (text !== view.text) {
    view.mass *= Simplify.DurationNo
    view.load.duration = 'no'
    view.text = text
  }
}

function moveToYesDurationText(view: ViewType) {
  view.mass *= Simplify.DurationYes
  view.load.duration = 'yes'
}

function moveToNoAspirationText(view: ViewType) {
  const text = view.text.replace(/h~/g, '')
  if (text !== view.text) {
    view.mass *= Simplify.AspirationNo
    view.load.aspiration = 'no'
    view.text = text
  }
}

function moveToYesAspirationText(view: ViewType) {
  view.mass *= Simplify.AspirationYes
  view.load.aspiration = 'yes'
}

function moveToNoToneText(view: ViewType) {
  const text = view.text.replace(/[\-\+]+/g, '')
  if (text !== view.text) {
    view.mass *= Simplify.ToneNo
    view.load.tone = 'no'
    view.text = text
  }
}

function moveToYesToneText(view: ViewType) {
  view.mass *= Simplify.ToneYes
  view.load.tone = 'yes'
}

function moveToNoVowelText(view: ViewType) {
  const text = view.text
    .replace(/u\$/g, 'ð') // this isn't a vowel, it's the English r.
    .replace(/[aeiou][\^&_\+\-\!@]*/gi, '')
    .replace(/ð/g, 'u$')

  if (text !== view.text) {
    view.mass *= Simplify.VowelNone
    view.load.vowel = 'none'
    view.text = text
  }
}

function moveToOneVowelText(view: ViewType) {
  const text = view.text
    .replace(/u\$/g, 'ð')
    .replace(/[aeiou][\^&]*/gi, 'a')
    .replace(/ð/g, 'u$')
    .replace(/a+/g, 'a')

  if (text !== view.text) {
    view.mass *= Simplify.VowelOne
    view.load.vowel = 'one'
    view.text = text
  }
}

function moveToBasicVowelText(view: ViewType) {
  const text = view.text
    .replace(/u\$/g, 'ð')
    .replace(/([aeiou])[\^&]*/gi, (_, $1: string) => $1.toLowerCase())
    .replace(/a+/g, 'a')
    .replace(/e+/g, 'e')
    .replace(/i+/g, 'i')
    .replace(/o+/g, 'o')
    .replace(/u+/g, 'u')
    .replace(/ai/g, 'a')
    .replace(/au/g, 'a')
    .replace(/ao/g, 'o')
    .replace(/ae/g, 'e')
    .replace(/io/g, 'o')
    .replace(/ia/g, 'a')
    .replace(/ou/g, 'u')
    .replace(/oi/g, 'i')
    .replace(/ð/g, 'u$')

  if (text !== view.text) {
    view.mass *= Simplify.VowelBasic
    view.load.vowel = 'basic'
    view.text = text
  }
}

function moveToAllVowelText(view: ViewType) {
  view.mass *= Simplify.VowelAll
  view.load.vowel = 'all'
}

function moveToSimplifiedConsonantText(view: ViewType) {
  const text = view.text
    .replace(/H/g, 'h')
    .replace(/h~/g, 'h')
    .replace(/y~/g, 'y')
    .replace(/b[\?\!@]?/gi, 'p')
    .replace(/p[\?\!\*\.@]?/gi, 'p')
    .replace(/t[\?\!\*\.@]?/gi, 't')
    .replace(/d[\?\!\*@]?/gi, 't')
    .replace(/s[\?\!\*@]?/gi, 's')
    .replace(/j/gi, 'x')
    .replace(/v/gi, 'f')
    .replace(/z/gi, 's')
    .replace(/d/gi, 't')
    .replace(/g/gi, 'k')

  if (text !== view.text) {
    view.mass *= Simplify.ConsonantSimplified
    view.load.consonant = 'simplified'
    view.text = text
  }
}

function moveToAllConsonantText(view: ViewType) {
  view.mass *= Simplify.ConsonantAll
  view.load.consonant = 'all'
}
