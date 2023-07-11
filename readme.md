<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

<p align='center'>
  <img src='https://github.com/tunebond/read/blob/make/view/view.svg?raw=true' height='312'>
</p>

<h3 align='center'>
  read
</h3>
<p align='center'>
  A Cross-Cultural Romanization Scheme
</p>

<br/>
<br/>
<br/>

## Overview

Read Text uses the Latin script with diacritics to encode most of
Earth's natural language features, enough so that you can write every
language using the same Latin-oriented system and be close enough to a
realistic pronunciation, including nasalized vowels, tense consonants,
clicks, and tones, amongst other things. All of the symbols are shown
large and on the left of each box in the tables below.

In addition to a compact "Latin script with diacritics" version, there
is also an ASCII version suitable for writing on a traditional keyboard.
This is shown in a faint color in the upper right of each box in the
tables below. It is also clearly mapped out in the source code as well.

### Ease Read

This is the simplified, diacritic-free version of Read Text, as
demonstrated with these example words. Since it is so minimal, it is
much _easier_ for an English speaker to _read_, hence calling it the
Ease Read Text. It's not perfect, but it gets the job done.

| english    | ascii        | simplified  |
| :--------- | :----------- | :---------- |
| think      | `ciqk`       | theenk      |
| these      | `Ciz`        | zheez       |
| brother    | `brUCu$`     | bruzher     |
| bend       | `bEnd`       | bend        |
| date       | `det`        | daet        |
| cat        | `kAt`        | kaat        |
| father     | `faCu$`      | fazher      |
| eventually | `UvE^ntxOli` | uvenchuulee |
| cool       | `kul`        | kool        |
| lately     | `letli`      | laetlee     |
| koala      | `kOwalU`     | kuuwaluh    |
| creature   | `kritxu$`    | kreecher    |

The _simplified_ version is meant to be readable if you have some degree
of English intuition, but it's not meant to be perfect like it would
represent the words in English.

```ts
import read from '@tunebond/read'

read.ease('brUCu$') // => 'bruzher'
```

You can combine this with
[`@tunebond/text`](https://github.com/tunebond/text.js) to start from
native writing systems, and using that library convert to Call Text
ASCII, then simplify the ASCII into a somewhat readable form!

```ts
import text from '@tunebond/text'
import read from '@tunebond/read'

read.read(text.tibetan.read(someTibetan))
```

## Flow Read

This is the more rich formatting of the ASCII characters, using
diacritics and trying to keep things relatively minimal while still
being reasonably accurate with pronunciation. That is why we call it
Flow Read Text.

| ascii            | simplified   |
| :--------------- | :----------- |
| `txaando^`       | txaandȯ      |
| `surdjyo^`       | surdjyȯ      |
| `Ha$!a$@!^rijE`  | ḥa̱̖ȧ̱̤̖rıjẹ      |
| `H!u&_^th~`      | ḥ̖ṵ̄̇tḩ         |
| `eT!e_^mu`       | eṭ̖ē̇mu        |
| `txya@+a-a++u`   | txyà̤áȁu      |
| `hwpo$kUimUno$s` | hwpo̖kụımụno̖s |
| `sinho^rEsi`     | sınhȯrẹsı    |
| `batoo'aH`       | batoo'aḥ     |
| `batoo'aHh!`     | batoo'ah̥     |
| `aiyuQaK`        | aıyuq̇aḳ      |

```ts
import read from '@tunebond/read'

read.flow('eT!e_^mu') // => 'eṭ̖ē̇mu'
```

## Syllables and Pronunciation

Using the library, you can also count the number of syllables in a word,
and convert IPA text into ASCII Call Text.

```ts
import read from '@tunebond/read'

read.talk('kxɯʎʎikʰa̠da̠') // => 'kHOly~ly~ikh~a@da@'
read.mark('kHOly~ly~ikh~a@da@') // => { size: 4 }
```

## Tone Text

You can also transform Read Text into
[Tone Text](https://github.com/tunebond/tone) by writing it in ASCII,
and running it through the tone text code, which is freely available and
open source there.

```ts
import tone from '@tunebond/tone'

// make it for the font.
tone.make('a+a+si-kiri-imu-') // => 'a3a3si4kiri4imu4'
```

## License

Copyright 2021-2023 <a href='https://tune.bond'>TuneBond</a>

Licensed under the Apache License, Version 2.0 (the "License"); you may
not use this file except in compliance with the License. You may obtain
a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

## TuneBond

This is being developed by the folks at [TuneBond](https://tune.bond), a
California-based project for helping humanity master information and
computation. Find us on [Twitter](https://twitter.com/tunebond),
[LinkedIn](https://www.linkedin.com/company/tunebond), and
[Facebook](https://www.facebook.com/tunebond). Check out our other
[GitHub projects](https://github.com/tunebond) as well!
