
const assert = require('assert')
const form = require('.')

match('txaand(o)', 'txaandȯ')
match('surdjy(o)', 'surdjyȯ')
match('HaarijE', 'ḥaarijẹ')
match('eTemu', 'eṭemu')
match('txya^a_a^u', 'txyáàáu')
match('hwpo~kUimUno~s', 'hwpo̤kụimụno̤s')
match('sinh(o)r!Esi', 'sinhȯŕẹsi')
match("batoo'aH", "batoo'aḥ")
match('aiyur~aK', 'aiyur̤aḳ')

function match(a, b) {
  assert.strictEqual(form(a), b)
}
