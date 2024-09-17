import makeTalk from '~/make/talk/index.js'
import makeIpaToTalk from '~/make/ipa/talk.js'
import makeIpaToXSampa from '~/make/ipa/xsampa.js'

talk('txando^', 'txandȯ')
talk('surdjyo^', 'suṙdjyȯ')
talk('HEth~Ah', 'ḥẹtɦạh')
talk('siqk', 'siṅk')
talk('txya@+a-a++u', 'txyà̤áȁu')
talk('hwpo$kUi^mUno$s', 'hwpo̖kụïmụno̖s')
talk('sinho^rEsi', 'sinhȯṙẹsi')
talk("batO_'aH", 'batọ̄qaḥ')
talk('aiyuQaK', 'aiyuq̇aḳ')
talk("s'oQya&te", 'sqoq̇ya̰te')
talk('t!arEba', 't̖aṙẹba')
talk('txhaK!EnEba', 'txhaḳ̖ẹnẹba')
talk('txh~im', 'txɦim')
talk('txy~h~im', 'txẏɦim')
talk('mh!im', 'mħim')
talk('nh!iqh!lh!', 'nħiṅħlħ')
talk('p*at.', 'p̂aṯ')
talk('t*et.', 't̬eṯ')
talk('nulQ~tQ~', 'nul̰t̰')
talk('b?ad?', 'b̗ad̗')
talk('p*od*h~U&u$t*ak*el*', 'p̂od̬ɦụ̰rt̬ak̬el̬')
talk('na/\\q', 'nâṅ')
talk('na\\\\q', 'nȁṅ')

// talk('diəm˧˩˨')
// talk('cɤ̆n˧˧')
// talk('ɲɤ˨˦')
// talk('uj˧˩˨')
// talk('è.ɣì.ɣɔ̀')
// talk('àá.fá')
// talk('àà.k͡pɔ̃̀') // ?
// talk('àá.ɾĩ́')
// talk('āá.sì.kí')
// talk('áásìkiriìmù')
// talk('āá.ʃáà.ī.tà')
// talk('àà.wɛ̀')
// talk('àà.jò')
// talk('ʊ̄.mɔ̃̄.lɛ̀')
// talk('jà.ú.jà.úù')
// talk('ka̠ɡa̠sʰʌ̹ŋd͡ʑa̠')
// talk('ˈka̠ːɡa̠ɦa̠da̠')
// talk('ka̠ɡa̠βo̞βo̞')
// talk('săw˧˩˨')
// talk('sɤ̆p˨ˀ˩')
// talk('ʔɗəwk͡p̚˧˨ʔ')
// talk('ɑb̥eˈd̥isə')
// talk('t͡ɕɘ(ː)ŋo̞')
// talk('t͡ɕʌ̹t̚k͈a̠ɾa̠k̚t͡ɕ͈iɭ')
// talk('t͡ɕʌ̹pɕ͈i')
// talk('ˈt͡ɕɘ(ː)mpʰo̞')
// talk('t͡ɕʌ̹ŋɕʰinɰiɦa̠k̚')
// talk('t͡ɕʌ̹ŋsʰa̠ŋβwe̞da̠m')
// talk('ip̚p͈ʌ̹p̚t͡ɕ͈a̠')
// talk('(ʔ)evoˈlut͡sja')
// talk('adʁiˈχal')
ipaToTalk(
  'k͈o̞ms͈o̞mo̞ɭsʰɯkxɯ-na̠-a̠muɾe̞',
  'k@oms@omoLsh~OkHO=-na_u&=-a_u&mure',
)
ipaToTalk('ɸʷo̞', 'Fw~o')
ipaToTalk('kxɯnsʰo̞ɾit͡ɕʰida̠', 'kHOnsh~oritxy~h~ida_u&')
ipaToTalk('kxɯʎʎikʰa̠da̠', 'kHOly~ly~ikh~a_u&da_u&')
ipaToTalk('ɔ̂ːi̯.on', 'o$_i@on')
ipaToTalk('kuɾl', 'kurl')

function talk(a: string, b: string) {
  const o = makeTalk(a)
  // console.log(o)
  o.split('').forEach((x, i) => {
    if (x !== b[i]) {
      throw new Error(`${o} with ${x} != ${b[i]}`)
    }
  })
}

function ipaToTalk(a: string, b: string) {
  const o = makeIpaToTalk(a)
  const x = makeIpaToXSampa(a)
  // console.log(o, x)
  console.log(a, x)
  o.split('').forEach((x, i) => {
    if (x !== b[i]) {
      throw new Error(`${o} with ${x} != ${b[i]}`)
    }
  })
}
