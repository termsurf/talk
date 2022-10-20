
const st = require('@lancejpollard/script-tree')

const m = {
  u: {
    'grave': '\u0300',
    'acute': '\u0301',
    'dacute': '\u030B',
    'dgrave': '\u030F',
    'up': '\u0302',
    'down': '\u030C',
    'dot': '\u0307',
    'ddot': '\u0308',
    'ring': '\u030A',
    'tilde': '\u0303',
    'macron': '\u0304'
  },
  d: {
    'grave': '\u0316',
    'acute': '\u0317',
    'ring': '\u0325',
    'dot': '\u0323',
    'ddot': '\u0324',
    'down': '\u032C',
    'tilde': '\u0330',
    'macron': '\u0331'
  }
}

const D = {
  '--': m.u.dacute,
  '-': m.u.acute,
  '++': m.u.dgrave,
  '+': m.u.grave,
  '^': m.u.dot, // accent mark
  '#': m.d.ring,
  '&': m.d.tilde,
  '_': m.u.macron, // long vowel
  '': ''
}

const G = {
  'I': `ı${m.d.dot}`,
  'E': `e${m.d.dot}`,
  'A': `a${m.d.dot}`,
  'O': `o${m.d.dot}`,
  'U': `u${m.d.dot}`,
  'i': `ı`,
  'e': `e`,
  'a': `a`,
  'o': `o`,
  'u': `u`,
}

const VOWELS = []
const BASE_VOWEL_GLYPHS = ['I', 'E', 'A', 'O', 'U', 'i', 'e', 'a', 'o', 'u']
const TONE_MARKS = ['--', '-', '++', '+', '']
const VARIANT_MARKS = ['#', '']
const NASAL_MARKS = ['&', '']
const LONG_MARKS = ['_', '']
const ACCENT_MARKS = ['^', '']

BASE_VOWEL_GLYPHS.forEach(g => {
  ACCENT_MARKS.forEach(a => {
    LONG_MARKS.forEach(l => {
      NASAL_MARKS.forEach(n => {
        VARIANT_MARKS.forEach(v => {
          TONE_MARKS.forEach(t => {
            const i = `${g}${v}${n}${t}${l}${a}`
            const o = `${G[g]}${D[n]}${D[v]}${D[l]}${D[a]}${D[t]}`
            VOWELS.push({ i, o })
          })
        })
      })
    })
  })
})

const CONSONANTS = [
  { i: "h!", o: `ȟ` },
  { i: 'm', o: `m` },
  { i: 'N', o: `ṇ`, o2: `n${m.d.dot}` },
  { i: 'n', o: `n` },
  { i: 'q!', o: `q${m.u.grave}` },
  { i: 'q', o: `q` },
  { i: 'Q', o: `q${m.u.dot}` },
  { i: 'G', o: `ġ`, o2: `g${m.u.dot}` },
  { i: 'G~', o: `ĝ`, o2: `g${m.u.ddot}` },
  { i: 'g?', o: `ɠ`, o2: `g${m.u.acute}` },
  { i: 'g@', o: `g${m.u.ring}` },
  { i: "Q~", o: `ř` },
  { i: 'g', o: `g` },
  { i: '\'', o: `'` },
  { i: '\'~', o: `-` },
  { i: 'd?', o: `ɗ`, o2: `d${m.d.acute}` },
  { i: 'd!', o: `d${m.d.grave}` },
  { i: 'd*', o: `ḓ`, o2: `d${m.d.up}` },
  { i: 'D', o: `ḍ`, o2: `d${m.d.dot}` },
  { i: 'd@', o: `d${m.d.ring}` },
  { i: 'd', o: `d` },
  { i: 'b?', o: `ɓ`, o2: `b${m.d.acute}` },
  { i: 'b!', o: `b${m.d.grave}` },
  { i: 'b@', o: `b${m.d.ring}` },
  { i: 'b', o: `b` },
  { i: 'p!', o: `p${m.u.grave}` },
  { i: 'p*', o: `p${m.u.up}` },
  { i: 'p@', o: `p${m.u.ring}` },
  { i: 'p.', o: `p${m.u.ddot}` },
  { i: 'p', o: `p` },
  { i: 'T!', o: `ṭ${m.d.grave}`, o2: `t${m.d.dot}${m.d.grave}` },
  { i: 'T', o: `ṭ`, o2: `t${m.d.dot}` },
  { i: 't!', o: `t${m.d.grave}` },
  { i: 't*', o: `ṱ`, o2: `t${m.d.up}` },
  { i: 't@', o: `t${m.d.ring}` },
  { i: 't.', o: `t${m.d.ddot}` },
  { i: 't', o: `t` },
  { i: 'k!', o: `k${m.d.grave}` },
  { i: 'k*', o: `k${m.d.down}` },
  { i: 'K!', o: `k${m.d.dot}${m.d.grave}` },
  { i: 'K', o: `ḳ`, o2: `k${m.d.dot}` },
  { i: 'k@', o: `k${m.d.ring}` },
  { i: 'k.', o: `k${m.d.ddot}` },
  { i: 'k', o: `k` },
  { i: 'H!', o: `ḥ${m.d.grave}` },
  { i: 'H', o: `ḥ`, o2: `h${m.d.dot}` },
  { i: 'h~', o: `ḩ`, o2: `h${m.d.ddot}` },
  { i: 'h', o: `h` },
  { i: 'J', o: `ȷ̈` },
  { i: "j!", o: `j${m.d.grave}` },
  { i: 'j', o: `j` },
  { i: 'S!', o: `ş${m.u.grave}`, o2: `s${m.d.dot}${m.u.grave}` },
  { i: 's!', o: `s${m.u.grave}` },
  { i: 'S', o: 'ş', o2: `s${m.d.dot}` },
  { i: 's@', o: `s${m.d.ring}` },
  { i: 's', o: `s` },
  { i: 'F', o: `ḟ`, o2: `f${m.u.dot}` },
  { i: "f!", o: `f${m.d.grave}` },
  { i: 'f', o: `f` },
  { i: 'V', o: `ṿ`, o2: `v${m.d.dot}` },
  { i: 'v', o: `v` },
  { i: "z!", o: 'ź' },
  { i: 'z', o: `z` },
  { i: "Z!", o: `ź${m.d.dot}` },
  { i: 'Z', o: `ẓ` },
  { i: 'C#', o: `ḉ`, o2: `c${m.d.ddot}` },
  { i: 'C', o: `ç`, o2: `c${m.d.dot}` },
  { i: 'c', o: `c` },
  { i: 'L', o: `ḷ`, o2: `l${m.d.dot}` },
  { i: 'l*', o: `ḽ`, o2: `l${m.d.up}` },
  { i: 'l', o: `l` },
  { i: 'R', o: `ṛ`, o2: `r${m.d.dot}` },
  { i: 'r', o: `r` },
  { i: 'x!', o: `x${m.d.grave}` },
  { i: 'X!', o: `ẋ${m.d.grave}`, o2: `x${m.u.dot}${m.d.grave}` },
  { i: 'X', o: `ẋ`, o2: `x${m.u.dot}` },
  { i: 'x@', o: `x${m.d.ring}` },
  { i: 'x', o: `x` },
  { i: 'w!', o: `w${m.d.grave}` },
  { i: 'w~', o: `ẇ`, o2: `w${m.u.dot}` },
  { i: 'w', o: `w` },
  { i: 'y~', o: `ẏ`, o2: `y${m.u.dot}` },
  { i: 'y', o: `y` },
  { i: "'", o: '\'' },
]

const ASCII_TO_UNICODE = [...VOWELS, ...CONSONANTS]

const tree = st.fork(ASCII_TO_UNICODE)
const form = text => st.form(text, tree)

form.ASCII_TO_UNICODE = ASCII_TO_UNICODE
form.map = m
form.VOWELS = VOWELS
form.CONSONANTS = CONSONANTS

if (typeof module != 'undefined') {
  module.exports = form
}
