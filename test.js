
const assert = require('assert')
const form = require('.')

match('txaand(o)', 'txaandȯ')
match('surdjy(o)', 'surdjyȯ')
match('HaarijE', 'ḥaarıjẹ')
match('eTemu', 'eṭemu')
match('txya+a-a+u', 'txyáàáu')
match('hwpo#kUimUno#s', 'hwpo̤kụımụno̤s')
match('sinh(o)rEsi', 'sınhȯrẹsı')
match("batoo'aH", "batoo'aḥ")
match('aiyuQaK', 'aıyuq̇aḳ')
match("s'oQya~te", "s'oq̇ya̰te")
match('t!arEba', 't̖arẹba')
match('txhaK!EnEba', 'txhaḳ̖ẹnẹba')

function match(a, b) {
  assert.strictEqual(form(a), b)
}
