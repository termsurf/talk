
const assert = require('assert')
const form = require('.')

match('txaando^', 'txaandȯ')
match('surdjyo^', 'surdjyȯ')
match('HaarijE', 'ḥaarıjẹ')
match('eTemu', 'eṭemu')
match('txya+a-a+u', 'txyàáàu')
match('hwpo#kUimUno#s', 'hwpo̤kụımụno̤s')
match('sinho^rEsi', 'sınhȯrẹsı')
match("batoo'aH", "batoo'aḥ")
match('aiyuQaK', 'aıyuq̇aḳ')
match("s'oQya~te", "s'oq̇ya̰te")
match('t!arEba', 't̖arẹba')
match('txhaK!EnEba', 'txhaḳ̖ẹnẹba')

function match(a, b) {
  const o = form(a)
  o.split('').forEach((x, i) => {
    if (x !== b[i]) {
      throw new Error(`${o} with ${x} != ${b[i]}`)
    }
  })
}
