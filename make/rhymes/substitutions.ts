import fs from 'fs'
import { CONSONANT_KEYS } from './features'
import { weightedJaccard } from '../tools/jaccard'

const startingConsonants = CONSONANT_KEYS.map(key => [{ key }]).concat(
  `bl
br
cl
cr
dr
fl
fr
gl
gr
kl
kr
pl
pr
sl
sm
sn
sp
st
tr
tw
sk
sw
sr
sc
th
sh
ch
ph
thw
sch
spl
spr
str
skr
slj
trj
blj
blw
drw
brw
kw
grw
kn
gn
zl
zn
vl
vr
ps
pt
pn
skh
sth
sf
ks
zh
zv
spn
shl
skl
smn
shr
chv
thn
klh
ql
phn
zr
brl
grk
ndr
ndl
sdr
skn
slz
zj
zd
rz
tsr
tn
prn
skj
svk
dj
trl
khr
chr
tsw
thr
ghn`
    .trim()
    .split(/\n+/)
    .map(text => text.split('').map(key => ({ key }))),
)

export type Substitution = {
  key: string
  vector: Float32Array
}

export type SubstitutionList = {
  list: Array<Substitution>
  vector: Float32Array
}

export type Cluster = {
  key: string
}

export type Substitutions = Record<string, SubstitutionList>

const startingConsonantSubstitutions =
  startingConsonants.reduce<Substitutions>((map, cluster) => {
    const list = startingConsonants.map(consonant)
    const { key, vector } = consonant(cluster)

    map[key] = { list, vector }

    return map
  }, {})

const substitutions = {
  ...startingConsonantSubstitutions,
}

fs.writeFileSync(
  `make/rhymes/substitutions.json`,
  stringify(substitutions),
)

function stringify(substitutions: Substitutions) {
  const text = []

  text.push(`{`)

  let n = Object.keys(substitutions).length
  let i = 0
  for (const key in substitutions) {
    const sub = substitutions[key]!
    text.push(`  "${key}": {`)
    sub.list.forEach((item, i) => {
      const tail = i === sub.list.length - 1 ? '' : ','
      const sum = weightedJaccard(sub.vector, item.vector)
      text.push(`    "${item.key}": ${sum}${tail}`)
    })
    const tail = i === n - 1 ? '' : ','
    text.push(`  }${tail}`)
    i++
  }

  text.push(`}`)
  return text.join('\n')
}

// function consonant(symbols: Array<Cluster>) {
//   const vector = new Float32Array(
//     4 * CONSONANT_VECTOR_PLACEHOLDER.length,
//   )
//   symbols.forEach((symbol, i) => {
//     const consonant = CONSONANTS[symbol.key]!
//     let j = 0
//     while (j < consonant.length) {
//       vector[i * 4 + j] = consonant[j]!
//       j++
//     }
//   })
//   return { key: symbols.map(({ key }) => key).join(''), vector }
// }
function consonant(symbols: Array<Cluster>) {
  const vector = new Float32Array()
  // combineConsonantClusterVectors(
  //   symbols.map(symbol => symbol.key),
  // )

  return { key: symbols.map(({ key }) => key).join(''), vector }
}
