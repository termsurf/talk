<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

<p align='center'>
  <img src='https://github.com/termsurf/talk/blob/make/view/view.svg?raw=true' height='312'>
</p>

<h3 align='center'>
  @termsurf/talk
</h3>
<p align='center'>
  A Cross-Cultural Romanization Scheme
</p>

<br/>
<br/>
<br/>

## Overview

**Talk** uses the Latin script with diacritics to encode most of Earth's
natural language features, enough so that you can write every language
using the same Latin-oriented system and be close enough to a realistic
pronunciation, including nasalized vowels, tense consonants, clicks, and
tones, amongst other things.

There are two forms:

- **ASCII**: For writing in a text editor without fancy symbols.
- **Simplified**: For reading with condensed characters and diacritics.

The goal of the simplified version is to make it as easy as possible to
read text given basic knowledge of today's standard English writing
practices.

## Examples

| ascii           | simplified   |
| :-------------- | :----------- |
| txaando^        | txaandȯ      |
| surdjyo^        | suṙdjyȯ      |
| HEth~Ah         | ḥẹtɦạh       |
| siqk            | siṅk         |
| txya@+a-a++u    | txyà̤áȁu      |
| hwpo$kUi^mUno$s | hwpo̖kụïmụno̖s |
| sinho^rEsi      | sinhȯṙẹsi    |
| batO\_'aH       | batọ̄qaḥ      |
| aiyuQaK         | aiyuq̇aḳ      |
| s'oQya&te       | sqoq̇ya̰te     |
| t!arEba         | t̖aṙẹba       |
| txhaK!EnEba     | txhaḳ̖ẹnẹba   |
| txh~im          | txɦim        |
| txy~h~im        | txẏɦim       |
| mh!im           | mħim         |

```ts
import make from '@termsurf/talk'

make('aiyuQaK') // => 'aiyuq̇aḳ'
```

### Modifiers

There are a few affixes on consonants and vowels. There are 5 tone
affixes (extra low, low, neutral, high, and extra high), which can be
combined in standard ways.

| category  | symbol  | meaning                                                                                                                               |
| :-------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------ |
| consonant | h~      | Aspiration (when added after a consonant)                                                                                             |
| consonant | w~      | Labialization (when added after a consonant)                                                                                          |
| consonant | y~      | Palatalization (when added after a consonant)                                                                                         |
| consonant | G~      | Velarization (when added after a consonant)                                                                                           |
| consonant | Q~      | Pharyngealization (when added after a consonant)                                                                                      |
| consonant | !       | Makes consonant ejective                                                                                                              |
| consonant | ?       | Makes consonant implosive                                                                                                             |
| consonant | @       | Makes consonant tense (korean)                                                                                                        |
| consonant | .       | Makes consonant a stop consonant (korean, so when you end on `t.`, it is making the mouth shape of `t` but not really pronouncing it) |
| consonant | \*      | Finds the closes "click consonant" mapping (there are 5, d, p, k, l, t)                                                               |
| consonant | capital | Consonant variant                                                                                                                     |
| vowel     | ^       | Stressed vowel                                                                                                                        |
| vowel     | \_      | Long vowel                                                                                                                            |
| vowel     | !       | Short vowel                                                                                                                           |
| vowel     | &       | Nasal vowel                                                                                                                           |
| vowel     | @       | Non-syllablic vowel                                                                                                                   |
| vowel     | capital | Vowel variant                                                                                                                         |
| vowel     | $       | Vowel variant                                                                                                                         |
| vowel     | +       | High tone                                                                                                                             |
| vowel     | ++      | Extra high tone                                                                                                                       |
| vowel     | -       | Low tone                                                                                                                              |
| vowel     | --      | Extra low tone                                                                                                                        |
| vowel     | /       | Rising tone (vietnamese sắc, mandarin )                                                                                               |
| vowel     | //      | Rising tone 2 (vietnamese ngã)                                                                                                        |
| vowel     | \\      | Falling tone (vietnamese huyền)                                                                                                       |
| vowel     | \\\\    | Falling tone 2 (vietnamese nặng)                                                                                                      |
| vowel     | /\\     | Rising falling tone                                                                                                                   |
| vowel     | \\/     | Falling rising tone (vietnamese hỏi)                                                                                                  |
| symbol    | =       | When preceding, can write a literal symbol, like `=.` is a period, `=+` is a plus, etc..                                              |

### Consonants

| IPA | ascii | simplified |
| :-- | :---- | :--------- |
| ʰ   | h~    | ɦ          |
| m   | m     | m          |
| ɳ   | N     | ṇ          |
| n   | n     | n          |
| ŋ   | q     | ṅ          |
| ˤ   | G~    | g̃          |
| ʁ   | G     | ġ          |
| ɠ   | g?    | ǵ          |
| g   | g     | g          |
| ʔ   | '     | q          |
| ʕ   | Q     | q̇          |
| ɗ   | d?    | d̗          |
| dʼ  | d!    | d̖          |
| ǂ   | d\*   | d̬          |
| d̚   | d.    | ḏ          |
| ɖ   | D     | ḍ          |
| dˤ  | dQ~   | d̰          |
| d   | d     | d          |
| ɓ   | b?    | b̗          |
| bʼ  | b!    | b̖          |
| b   | b     | b          |
| pʼ  | p!    | p̀          |
| ʘ   | p\*   | p̂          |
| p̚   | p.    | t̄          |
| p͈   | p@    | x̌          |
| p   | p     | p          |
| ʈʼ  | T!    | ṭ̖          |
| ʈ   | T     | ṭ          |
| tʼ  | t!    | t̖          |
| ǀ   | t\*   | t̬          |
| tˤ  | tQ~   | t̰          |
| t͈   | t@    | ṱ          |
| t̚   | t.    | ṯ          |
| t   | t     | t          |
| kʼ  | k!    | k̖          |
| k̚   | k.    | ḵ          |
| ǃ   | k\*   | k̬          |
| qʼ  | K!    | ḳ̖          |
| q   | K     | ḳ          |
| k   | k     | k          |
| χʼ  | H!    | ḥ̖          |
| χ   | H     | ḥ          |
|     | h!    | ħ          |
| h   | h     | h          |
| ʐ   | J     | ȷ̈          |
| ʒʼ  | j!    | j̀          |
| ʒ   | j     | j          |
| ɬʼ  | S!    | ṣ̀          |
| sʼ  | s!    | s̀          |
| ɬ   | S     | ṣ          |
| sˤ  | sQ~   | s̰          |
| s͈   | s@    | s̭          |
| s   | s     | s          |
| ɸ   | F     | f̣          |
| fʼ  | f!    | f̖          |
| f   | f     | f          |
| ʋ   | V     | ṿ          |
| v   | v     | v          |
| zʼ  | z!    | z̀          |
| zˤ  | zQ~   | z̰          |
| z   | z     | z          |
| ɮʼ  | Z!    | ẓ̀          |
| ɮ   | Z     | ẓ          |
| ðˤ  | CQ~   | c̣̃          |
| ð   | C     | c̣          |
| θˤ  | cQ~   | c̃          |
| θ   | c     | c          |
| ɭ   | L     | ḷ          |
| ǁ   | l\*   | l̬          |
| lˤ  | lQ~   | l̰          |
| l   | l     | l          |
| ɽ   | R     | ṛ          |
| r   | r     | ṙ          |
| ʃʼ  | x!    | x̀          |
| ʂʼ  | X!    | x̣̀          |
| ʂ   | X     | x̣          |
| ʃ͈   | x@    | x̭          |
| ʃ   | x     | x          |
| ɰ   | W     | ẇ          |
| wʼ  | w!    | ẁ          |
| ʷ   | w~    | ẉ          |
| w   | w     | w          |
| ʲ   | y~    | ẏ          |
| j   | y     | y          |

### Vowels

These are all the combos for the letter `a`, same applies to all vowels.

| IPA  | ascii | simplified |
| :--- | :---- | :--------- |
| æ    | A     | ạ          |
| œ    | a$    | a̤          |
| ˈa   | a^    | ȧ          |
| aː   | a\_   | ā          |
| aʼ   | a!    | a̱          |
| a̰    | a&    | a̰          |
| a͈    | a@    | a̖          |
| a˦   | a+    | á          |
| a˥   | a++   | a̋          |
| a˨   | a-    | à          |
| a˩   | a--   | ȁ          |
| a˧˥  | a/    | ą́          |
| a˩˥  | a//   | ą̋          |
| a˥˧  | a\    | ą̀          |
| a˥˩  | a\\   | ą̏          |
| a˩˥˩ | a/\   | â          |
| a˥˩˥ | a\\/  | ǎ          |

_Note: Exact tone sequences can be represented with sequences like
`a+a++a--`, where one vowel is spread across multiple tones. But common
tones, across languages, can take advantage of the shortened
syntax/encoding._

## Why not IPA or XSampa?

IPA and XSampa are useful because they are widespread amongst the
linguistic community, and much has been encoded using (at least) the IPA
encoding.

However, IPA is not that easy to understand or write for the average
English speaker, and XSampa is too foreign for the same group of people
(even though it's easy to write on a keyboard).

Our goal with Talk is to make an easy to write and easy to understand
3rd encoding which requires less expert knowledge. And a readable
romanization form ("simplified" form) which an average English speaker
can get close to intuiting without special knowledge.

## ReadTalk

Here we have included a system inspired by the
[Double Metaphone algorithm](https://github.com/words/double-metaphone/blob/main/index.js),
which is an algorithm which creates a simplified pronunciation "hash" of
some input text, usually English or other Indo-European languages.

Since Talk is itself a simplified ASCII pronunciation system for any of
the world's languages (like X-SAMPA or IPA, but easier to write), it was
straightforward to make a system where we _progressively simplify the
pronunciation from accurate to only simplified consonants and no
vowels_. There are 5 categories of things which get tinkered with when
"refining" the pronunciation from its most accurate form, to the most
basic form:

- **vowel**: none, one, basic, all. No vowels, the `a` vowel, the 5
  basic vowels `i e a o u`, or any possible vowel allowed by Talk.
- **consonant**: all, simplified. All possible consonants allowed by
  Talk, or a simplified subset, where it basically merges bp, td, xj,
  fv, sz, and kg, and gets rid of any consonant variants like click
  consonants or stop/tense consonants (Korean).
- **tone**: yes, no. Whether or not we include tone markers (useful in
  Chinese).
- **duration**: yes, no. Whether or not we include duration markers
  (useful in Sanskrit).
- **aspiration**: yes, no. Whether or not we include aspiration markers
  (useful in Indian languages).

By combining all these characteristics, we end up with something like
this (for the word `by~oph~am`, which has palatalization, aspiration,
and a few vowels and non-simplified consonants):

```js
import read from '@termsurf/talk/make/read'

const list = read('by~oph~am')
[
  {
    text: 'by~oph~am',
    mass: 405,
    load: {
      consonant: 'all',
      vowel: 'all',
      tone: 'yes',
      aspiration: 'yes',
      duration: 'yes',
    },
  },
  {
    text: 'by~ph~m',
    mass: 324,
    load: {
      consonant: 'all',
      vowel: 'basic',
      tone: 'yes',
      aspiration: 'yes',
      duration: 'yes',
    },
  },
  {
    text: 'by~opam',
    mass: 270,
    load: {
      consonant: 'all',
      vowel: 'all',
      tone: 'yes',
      aspiration: 'no',
      duration: 'yes',
    },
  },
  {
    text: 'pyopham',
    mass: 270,
    load: {
      consonant: 'simplified',
      vowel: 'all',
      tone: 'yes',
      aspiration: 'yes',
      duration: 'yes',
    },
  },
  {
    text: 'by~pm',
    mass: 216,
    load: {
      consonant: 'all',
      vowel: 'basic',
      tone: 'yes',
      aspiration: 'no',
      duration: 'yes',
    },
  },
  {
    text: 'pyphm',
    mass: 216,
    load: {
      consonant: 'simplified',
      vowel: 'basic',
      tone: 'yes',
      aspiration: 'yes',
      duration: 'yes',
    },
  },
]
```

The `mass` is basically a "weight" for now, to say how many features it
included, i.e. how close to the actual pronunciation it was. The smaller
the mass, the less it is like the original pronunciation.

You then use the `text` as a key in a lookup table to find words
matching that refined text pronunciation. You likely will find the same
term in several spots, but you can just filter those at at query time.

That's about it! Now have to play with this in production to see how
useful it is in practice for building pseudo-fuzzy dictionary search.

## Syllables and Pronunciation

Using the library, you can also count the number of syllables in a word,
and convert IPA text into ASCII Call Text.

```ts
import talk from '@termsurf/talk/make/talk'
import syllables from '@termsurf/talk/make/talk/syllables'

talk('kxɯʎʎikʰa̠da̠') // => 'kHOly~ly~ikh~a@da@'
syllables('kHOly~ly~ikh~a@da@') // => { size: 4 }
```

## IPA and XSampa

```ts
import talkToIPA from '@termsurf/talk/make/talk/ipa'
import talkToXSampa from '@termsurf/talk/make/talk/xsampa'
import ipaToTalk from '@termsurf/talk/make/ipa/talk'
```

## Tone Text

You can also transform Talk into
[Tone Text](https://github.com/termsurf/tone) by writing it in ASCII,
and running it through the tone text code, which is freely available and
open source there.

```ts
import tone from '@termsurf/tone'

// make it for the font.
tone.make('a+a+si-kiri-imu-') // => 'a3a3si4kiri4imu4'
```

## License

MIT

## TermSurf

This is being developed by the folks at [TermSurf](https://term.surf), a
California-based project for helping humanity master information and
computation. Find us on [Twitter](https://twitter.com/termsurf),
[LinkedIn](https://www.linkedin.com/company/termsurf), and
[Facebook](https://www.facebook.com/termsurf). Check out our other
[GitHub projects](https://github.com/termsurf) as well!
