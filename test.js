
const assert = require('assert')
const form = require('.')

match('txaand(o)', 'txaandȯ')
match('surdjy(o)', 'surdjyȯ')
match('HaarijE', 'ḥaarıjẹ')
match('eTemu', 'eṭemu')
match('txya^a_a^u', 'txyáàáu')
match('hwpo~kUimUno~s', 'hwpo̤kụımụno̤s')
match('sinh(o)r!Esi', 'sınhȯŕẹsı')
match("batoo'aH", "batoo'aḥ")
match('aiyur~aK', 'aıyur̤aḳ')
match("s'or~ya&te", "s'or̤ya̰te")
match('t!ar!Eba', 't̖aŕẹba')
match('txhaK!EnEba', 'txhaḳ̖ẹnẹba')

function match(a, b) {
  assert.strictEqual(form(a), b)
}
