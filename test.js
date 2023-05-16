
const assert = require('assert')
const form = require('.')

match('txaando^', 'txaandȯ')
match('surdjyo^', 'surdjyȯ')
match('Ha$!a@rijE', 'ḥa̱̥a̤rıjẹ')
match('eTe_^mu', 'eṭē̇mu')
match('txya@+a-a++u', 'txyà̤áȁu')
match('hwpo$kUimUno$s', 'hwpo\u0325kụımụno\u0325s')
match('sinho^rEsi', 'sınhȯrẹsı')
match("batoo'aH", "batoo'aḥ")
match("batoo'aHh!", "batoo'ah̥")
match('aiyuQaK', 'aıyuq̇aḳ')
match("s'oQya&te", "s'oq̇ya̰te")
match('t!arEba', 't̖arẹba')
match('txhaK!EnEba', 'txhaḳ̖ẹnẹba')
match('txh~im', 'txḩım')
match('txy~h~im', 'txẏḩım')
match('mh!im', 'm\u030Aım')
match('nh!iqh!lh!', 'n\u030Aıq\u030Al̥')

function match(a, b) {
  const o = form(a)
  console.log(o)
  o.split('').forEach((x, i) => {
    if (x !== b[i]) {
      throw new Error(`${o} with ${x} != ${b[i]}`)
    }
  })
}
