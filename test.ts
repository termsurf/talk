import chat from './index.js'

test('txaando^', 'txaandȯ')
test('surdjyo^', 'surdjyȯ')
test('Ha$!a$@!^rijE', 'ḥa̱̖ȧ̱̤̖rıjẹ')

test('Ha$!a$@_^rijE', 'ḥa̱̖ā̤̖̇rıjẹ')

test('H!u&_^th~', 'ḥ̖ṵ̄̇tḩ')
test('eT!e_^mu', 'eṭ̖ē̇mu')
test('txya@+a-a++u', 'txyà̤áȁu')
test('hwpo$kUimUno$s', 'hwpo̖kụımụno̖s')
test('sinho^rEsi', 'sınhȯrẹsı')
test("batoo'aH", "batoo'aḥ")
test("batoo'aHh!", "batoo'ah̥")
test('aiyuQaK', 'aıyuq̇aḳ')
test("s'oQya&te", "s'oq̇ya̰te")
test('t!arEba', 't̖arẹba')
test('txhaK!EnEba', 'txhaḳ̖ẹnẹba')
test('txh~im', 'txḩım')
test('txy~h~im', 'txẏḩım')
test('mh!im', 'm\u030Aım')
test('nh!iqh!lh!', 'n\u030Aıq\u030Al̥')
test('p*at@', 'ṗ̂aṱ')
test('t*et.', 'ṭ̬et̰')
test('n~ul~t~', 'n̂ul̬t̬')
test('b?ad?', 'ɓaɗ')
test('p*od*h~t*ak*el*', 'ṗ̂oḍ̬ḩṭ̬aḳ̬eḷ̬')

function test(a: string, b: string) {
  const o = chat(a)
  console.log(o)
  o.split('').forEach((x, i) => {
    if (x !== b[i]) {
      throw new Error(`${o} with ${x} != ${b[i]}`)
    }
  })
}
