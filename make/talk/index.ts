import st from '@lancejpollard/script-tree'

const m = {
  u: {
    grave: '\u0300',
    acute: '\u0301',
    dacute: '\u030B',
    dgrave: '\u030F',
    up: '\u0302',
    down: '\u030C',
    dot: '\u0307',
    ddot: '\u0308',
    ring: '\u030A',
    tilde: '\u0303',
    macron: '\u0304',
  },
  d: {
    grave: '\u0316',
    acute: '\u0317',
    ring: '\u0325',
    dot: '\u0323',
    ddot: '\u0324',
    down: '\u032C',
    tilde: '\u0330',
    macron: '\u0331',
    cedilla: '\u0327',
    up: '\u032D',
  },
}

const D: Record<string, string> = {
  '--': m.u.dacute,
  '-': m.u.acute,
  '++': m.u.dgrave,
  '/': m.u.acute, // rising (vietnamese sắc)
  '//': m.u.dacute, // rising 2 (vietnamese ngã)
  '\\/': m.u.down, // falling rising (vietnamese hỏi)
  '/\\': m.u.up, // falling rising
  '\\': m.u.grave, // falling (vietnamese huyền)
  '\\\\': m.u.dgrave, // falling 2 (vietnamese nặng)
  '+': m.u.grave,
  '^': m.u.dot, // accent mark
  $: m.d.grave,
  '&': m.d.tilde,
  _: m.u.macron, // long vowel
  '@': m.d.ddot, // non-syllabic
  '!': m.d.macron, // short vowel
  '': '',
}

const G: Record<string, string> = {
  I: `i${m.d.dot}`,
  E: `e${m.d.dot}`,
  A: `a${m.d.dot}`,
  O: `o${m.d.dot}`,
  U: `u${m.d.dot}`,
  i: `i`,
  e: `e`,
  a: `a`,
  o: `o`,
  u: `u`,
}

export type Take = {
  i: string
  o: string
  name?: string
  o2?: string
}

export const VOWELS: Array<Take> = []

const BASE_VOWEL_GLYPHS = [
  'I',
  'E',
  'A',
  'O',
  'U',
  'i',
  'e',
  'a',
  'o',
  'u',
]
const TONE_MARKS = [
  '--',
  '-',
  '++',
  '+',
  '//',
  '\\/',
  '/\\',
  '\\',
  '\\\\',
  '',
]
const VARIANT_MARKS = ['$', '']
const NASAL_MARKS = ['&', '']
const DURATION_MARKS = ['_', '!', '']
const SYLLABIC_MARKS = ['@', '']
const ACCENT_MARKS = ['^', '']

BASE_VOWEL_GLYPHS.forEach(g => {
  ACCENT_MARKS.forEach(a => {
    DURATION_MARKS.forEach(l => {
      SYLLABIC_MARKS.forEach(s => {
        NASAL_MARKS.forEach(n => {
          VARIANT_MARKS.forEach(v => {
            TONE_MARKS.forEach(t => {
              const i = `${g}${v}${n}${s}${t}${l}${a}`
              const x = g.match(/i/i) && a === '^' ? 'ï' : G[g]
              const y = x === 'ï' ? '' : D[a]
              const x2 = v === '$' && x === 'u' ? 'r' : x
              const v2 = v === '$' && g === 'u' ? '' : `${D[v]}`
              const o =
                l === '!'
                  ? `${x2}${y}${D[t]}${D[l]}${D[n]}${D[s]}${v2}`
                  : `${x2}${D[t]}${D[l]}${D[n]}${D[s]}${v2}${y}`
              VOWELS.push({ i, o })
            })
          })
        })
      })
    })
  })
})

export const CONSONANTS = [
  { i: '@', o: `` },
  { i: 'h~', o: `ɦ` },
  { i: 'm', o: `m` },
  { i: 'N', o: `n${m.d.dot}` },
  { i: 'n', o: `n` },
  { i: 'q', o: `n${m.u.dot}` },
  { i: 'G~', o: `g${m.u.tilde}` },
  { i: 'G', o: `g${m.u.dot}` },
  { i: 'g?', o: `g${m.u.acute}` },
  { i: 'g', o: `g` },
  { i: "'", o: `q` },
  { i: 'Q', o: `q${m.u.dot}` },
  { i: 'd?', o: `d${m.d.acute}` },
  { i: 'd!', o: `d${m.d.grave}` },
  { i: 'd*', o: `d${m.d.down}` },
  { i: 'd.', o: `d${m.d.macron}` },
  { i: 'D', o: `d${m.d.dot}` },
  { i: 'dQ~', o: `d${m.d.tilde}` },
  { i: 'd', o: `d` },
  { i: 'b?', o: `b${m.d.acute}` },
  { i: 'b!', o: `b${m.d.grave}` },
  { i: 'b', o: `b` },
  { i: 'p!', o: `p${m.u.grave}` },
  { i: 'p*', o: `p${m.u.up}` },
  { i: 'p.', o: `t${m.u.macron}` },
  { i: 'p@', o: `x${m.u.down}` },
  { i: 'p', o: `p` },
  {
    i: 'T!',
    o: `t${m.d.dot}${m.d.grave}`,
  },
  { i: 'T', o: `t${m.d.dot}` },
  { i: 't!', o: `t${m.d.grave}` },
  { i: 't*', o: `t${m.d.down}` },
  { i: 'tQ~', o: `t${m.d.tilde}` },
  { i: 't@', o: `t${m.d.up}` },
  { i: 't.', o: `t${m.d.macron}` },
  { i: 't', o: `t` },

  { i: 'k!', o: `k${m.d.grave}` },
  { i: 'k.', o: `k${m.d.macron}` },
  { i: 'k*', o: `k${m.d.down}` },
  { i: 'K!', o: `k${m.d.dot}${m.d.grave}` },
  { i: 'K', o: `k${m.d.dot}` },
  { i: 'k', o: `k` },
  { i: 'H!', o: `h${m.d.dot}${m.d.grave}` },
  { i: 'H', o: `h${m.d.dot}` },
  { i: 'h!', o: `ħ` },
  { i: 'h', o: `h` },
  { i: 'J', o: `ȷ̈` },
  { i: 'j!', o: `j${m.u.grave}` },
  { i: 'j', o: `j` },
  { i: 'S!', o: `s${m.d.dot}${m.u.grave}` },
  { i: 's!', o: `s${m.u.grave}` },
  { i: 'S', o: `s${m.d.dot}` },
  { i: 'sQ~', o: `s${m.d.tilde}` },
  { i: 's@', o: `s${m.d.up}` },
  { i: 's', o: `s` },
  { i: 'F', o: `f${m.d.dot}` },
  { i: 'f!', o: `f${m.d.grave}` },
  { i: 'f', o: `f` },
  { i: 'V', o: `v${m.d.dot}` },
  { i: 'v', o: `v` },
  { i: 'z!', o: `z${m.u.grave}` },
  { i: 'zQ~', o: `z${m.d.tilde}` },
  { i: 'z', o: `z` },
  { i: 'Z!', o: `z${m.d.dot}${m.u.grave}` },
  { i: 'Z', o: `z${m.d.dot}` },
  { i: 'CQ~', o: `c${m.d.dot}${m.u.tilde}` },
  { i: 'C', o: `c${m.d.dot}` },
  { i: 'cQ~', o: `c${m.u.tilde}` },
  { i: 'c', o: `c` },
  { i: 'L', o: `l${m.d.dot}` },
  { i: 'l*', o: `l${m.d.down}` },
  { i: 'lQ~', o: `l${m.d.tilde}` },
  { i: 'l', o: `l` },
  { i: 'R', o: `r${m.d.dot}` },
  { i: 'r', o: `r${m.u.dot}` },
  { i: 'x!', o: `x${m.u.grave}` },
  { i: 'X!', o: `x${m.d.dot}${m.u.grave}` },
  { i: 'X', o: `x${m.d.dot}` },
  { i: 'x@', o: `x${m.d.up}` },
  { i: 'x', o: `x` },
  { i: 'W', o: `w${m.u.dot}` },
  { i: 'w!', o: `w${m.u.grave}` },
  { i: 'w~', o: `w${m.d.dot}` },
  { i: 'w', o: `w` },
  { i: 'y~', o: `y${m.u.dot}` },
  { i: 'y', o: `y` },
]

export const SYMBOLS = [
  { i: '=.', o: '.' },
  { i: '=?', o: '?' },
  { i: '=!', o: '!' },
  { i: '=+', o: '+' },
  { i: '=-', o: '-' },
  { i: '>', o: '>' },
  { i: '<', o: '<' },
  { i: '/', o: '/' },
  { i: '\\', o: '\\' },
  { i: '|', o: '|' },
  { i: '(', o: '(' },
  { i: ')', o: ')' },
  { i: '[', o: '[' },
  { i: ']', o: ']' },
  { i: ' ', o: ' ' },
]

export const NUMERALS = [
  { i: '0', o: '0' },
  { i: '1', o: '1' },
  { i: '2', o: '2' },
  { i: '3', o: '3' },
  { i: '4', o: '4' },
  { i: '5', o: '5' },
  { i: '6', o: '6' },
  { i: '7', o: '7' },
  { i: '8', o: '8' },
  { i: '9', o: '9' },
]

export const GLYPHS = [
  ...VOWELS,
  ...CONSONANTS,
  ...SYMBOLS,
  ...NUMERALS,
]

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
const tree = st.fork(GLYPHS)
// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
const make = (text: string): string => st.form(text, tree)

make.slot = (text: string): Array<string> =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
  st.list(text, tree).map((x: any) => x.i)

export default make
