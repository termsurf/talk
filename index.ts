import st from '@lancejpollard/script-tree'
import mark from './mark.js'
import talk from './talk.js'

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

const VOWELS: Array<Take> = []
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
const TONE_MARKS = ['--', '-', '++', '+', '']
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
              const o =
                l === '!'
                  ? `${x}${y}${D[t]}${D[l]}${D[n]}${D[s]}${D[v]}`
                  : `${x}${D[t]}${D[l]}${D[n]}${D[s]}${D[v]}${y}`
              VOWELS.push({ i, o })
            })
          })
        })
      })
    })
  })
})

const CONSONANTS = [
  { i: '=.', o: '.' },
  { i: '=?', o: '?' },
  { i: '=!', o: '!' },
  { i: '=+', o: '+' },
  { i: '=-', o: '-' },
  { i: 'mh!', o: `m${m.u.ring}` },
  { i: 'm', o: `m` },
  { i: 'Nh!', o: `ṇ${m.u.ring}` },
  { i: 'N', o: `ṇ`, o2: `n${m.d.dot}` },
  { i: 'nh!', o: `n${m.u.ring}` },
  { i: 'n~', o: `n${m.u.up}` },
  { i: 'n', o: `n` },
  { i: 'qh!', o: `q${m.u.ring}` },
  { i: 'q!', o: `q${m.u.grave}` },
  { i: 'q', o: `q` },
  { i: 'Q', o: `q${m.u.dot}` },
  { i: 'G', o: `ġ`, o2: `g${m.u.dot}` },
  { i: 'G~', o: `ĝ`, o2: `g${m.u.ddot}` },
  { i: 'g?', o: `ɠ`, o2: `g${m.u.acute}` },
  { i: 'g@', o: `g${m.u.ddot}` },
  { i: 'Q~', o: `ř` },
  { i: 'g', o: `g` },
  { i: "'", o: `'` },
  { i: "'~", o: `-` },
  { i: 'd?', o: `ɗ`, o2: `d${m.d.acute}` },
  { i: 'd!', o: `d${m.d.grave}` },
  { i: 'd*', o: `ḍ${m.d.down}`, o2: `d${m.d.up}` },
  { i: 'D', o: `ḍ`, o2: `d${m.d.dot}` },
  { i: 'd@', o: `ḓ` },
  { i: 'd.', o: `d${m.d.tilde}` },
  { i: 'd~', o: `d${m.d.down}` },
  { i: 'd', o: `d` },
  { i: 'b?', o: `ɓ`, o2: `b${m.d.acute}` },
  { i: 'b!', o: `b${m.d.grave}` },
  { i: 'b@', o: `b${m.d.up}` },
  { i: 'b.', o: `b${m.d.tilde}` },
  { i: 'b', o: `b` },
  { i: 'p!', o: `p${m.u.grave}` },
  { i: 'p*', o: `ṗ${m.u.up}` },
  { i: 'p@', o: `p${m.u.down}` },
  { i: 'p.', o: `p${m.u.tilde}` },
  { i: 'p', o: `p` },
  { i: 'T!', o: `ṭ${m.d.grave}`, o2: `t${m.d.dot}${m.d.grave}` },
  { i: 'T', o: `ṭ`, o2: `t${m.d.dot}` },
  { i: 't!', o: `t${m.d.grave}` },
  { i: 't*', o: `ṭ${m.d.down}`, o2: `t${m.d.up}` },
  { i: 't@', o: `ṱ` },
  { i: 't.', o: `t${m.d.tilde}` },
  { i: 't~', o: `t${m.d.down}` },
  { i: 't', o: `t` },
  { i: 'k!', o: `k${m.d.grave}` },
  { i: 'k*', o: `ḳ${m.d.down}` },
  { i: 'K!', o: `k${m.d.dot}${m.d.grave}` },
  { i: 'K', o: `ḳ`, o2: `k${m.d.dot}` },
  { i: 'k@', o: `k${m.d.up}` },
  { i: 'k.', o: `k${m.d.tilde}` },
  { i: 'k', o: `k` },
  { i: 'Hh!', o: `h${m.d.ring}` },
  { i: 'H!', o: `ḩ${m.d.grave}` },
  { i: 'H', o: `ḩ`, o2: `h${m.d.dot}` },
  { i: 'h~', o: `ḥ`, o2: `h${m.d.ddot}` },
  { i: 'h!', o: `h${m.d.down}` },
  { i: 'h', o: `h` },
  { i: 'J', o: `ȷ̈` },
  { i: 'j!', o: `j${m.d.grave}` },
  { i: 'j', o: `j` },
  { i: 'S!', o: `ş${m.u.grave}`, o2: `s${m.d.dot}${m.u.grave}` },
  { i: 's!', o: `s${m.u.grave}` },
  { i: 'S', o: 'ş', o2: `s${m.d.dot}` },
  { i: 's@', o: `s${m.d.up}` },
  { i: 's~', o: `s${m.d.down}` },
  { i: 's', o: `s` },
  { i: 'F', o: `ḟ`, o2: `f${m.u.dot}` },
  { i: 'f!', o: `f${m.d.grave}` },
  { i: 'f', o: `f` },
  { i: 'V', o: `ṿ`, o2: `v${m.d.dot}` },
  { i: 'v', o: `v` },
  { i: 'z!', o: 'ź' },
  { i: 'z~', o: `z${m.d.down}` },
  { i: 'z', o: `z` },
  { i: 'Z!', o: `ź${m.d.dot}` },
  { i: 'Z', o: `ẓ` },
  { i: 'C~', o: `ḉ`, o2: `c${m.d.ddot}` },
  { i: 'C', o: `ç`, o2: `c${m.d.dot}` },
  { i: 'c', o: `c` },
  { i: 'L', o: `ḷ`, o2: `l${m.d.dot}` },
  { i: 'l*', o: `ḷ${m.d.down}`, o2: `l${m.d.up}` },
  { i: 'lh!', o: `l${m.d.ring}` },
  { i: 'l~', o: `l${m.d.down}` },
  { i: 'l', o: `l` },
  { i: 'R', o: `ṛ`, o2: `r${m.d.dot}` },
  { i: 'rh!', o: `r${m.u.ring}` },
  { i: 'r', o: `r` },
  { i: 'x!', o: `x${m.d.grave}` },
  { i: 'X!', o: `ẋ${m.d.grave}`, o2: `x${m.u.dot}${m.d.grave}` },
  { i: 'X', o: `ẋ`, o2: `x${m.u.dot}` },
  { i: 'x@', o: `x${m.d.ring}` },
  { i: 'x', o: `x` },
  { i: 'W', o: `ẅ` },
  { i: 'w!', o: `ẁ` },
  { i: 'w~', o: `ẇ`, o2: `w${m.u.dot}` },
  { i: 'w', o: `w` },
  { i: 'y~', o: `ẏ`, o2: `y${m.u.dot}` },
  { i: 'y', o: `y` },
  { i: "'", o: "'" },
]

const ASCII_TO_UNICODE = [...VOWELS, ...CONSONANTS]

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
const tree = st.fork(ASCII_TO_UNICODE)
// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
const flow = (text: string): string => st.form(text, tree)

const form = {
  ASCII_TO_UNICODE: ASCII_TO_UNICODE,
  VOWELS: VOWELS,
  CONSONANTS: CONSONANTS,
  flow,
  ease,
  mark,
  talk,
}

export default form

/**
 * Make it somewhat readable (simplified).
 */

function ease(text: string) {
  return text
    .replace(/G(?!~)/g, 'r')
    .replace(/G~/g, '')
    .replace(/Q/g, "'")
    .replace(/q(?!k)/g, 'ng')
    .replace(/q/g, 'n')
    .replace(/[Tt]h/g, 't')
    .replace(/[C]/g, 'zh')
    .replace(/[c]/g, 'th')
    .replace(/[Tt]x/g, 'ch')
    .replace(/[\^@~_&]/g, '')
    .replace(/x/g, 'sh')
    .replace(/h\!/g, '')
    .replace(/(?<!=)\./g, '')
    .replace(/(?<!=)[\+\-\!\?]/g, '')
    .replace(/[I]+/g, 'i')
    .replace(/[e]+/g, 'ae')
    .replace(/[E]+/g, 'e')
    .replace(/[i]+/g, 'ee')
    .replace(/[a]+/g, 'a')
    .replace(/[A]+/g, 'aa')
    .replace(/o+/g, 'o')
    .replace(/u\$/g, 'er')
    .replace(/[u]+/g, 'oo')
    .replace(/[U]+$/g, 'uh')
    .replace(/[U]+/g, 'u')
    .replace(/O/g, 'uu')
    .replace(/[\$]/g, '')
    .replace(/\*/g, '')
    .replace(/=([\+\-\!\?])/, (_, $1: string) => $1)
    .toLowerCase()
}
