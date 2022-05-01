
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

<p align='center'>
  <img src='https://github.com/teamdrumwork/call/blob/make/view/view.svg?raw=true' height='312'>
</p>

<h3 align='center'>
  call
</h3>
<p align='center'>
  The <a href='https://github.com/teamdrumwork/tone'>Tone Text</a> Romanization Scheme
</p>

<br/>
<br/>
<br/>

<h3 id="summary">Summary</h3>

Call script uses the Latin script with diacritics to encode most of Earth's natural language features, enough so that you can write every language using the same Latin-oriented system and be close enough to a realistic pronunciation, including nasalized vowels, tense consonants, clicks, and tones, amongst other things. All of the symbols are shown large and on the left of each box in the tables below.

In addition to a compact "Latin script with diacritics" version, there is also an ASCII version suitable for writing on a traditional keyboard. This is shown in a faint color in the upper right of each box in the tables below. It is also clearly mapped out in the [source code](https://github.com/teamdrumwork/call/blob/make/form.js#L29-L265) as well. You can easily transform this into [tone script](https://github.com/teamdrumwork/tone) by writing call script in ASCII, and running it through the tone script code, which is freely available and open source there.

### Main Symbols

Here are the consonants and vowels in their main form (without tone or stress markers).

<p align="center">
  <img src="https://github.com/teamdrumwork/call/blob/make/symbols.png?raw=true" />
</p>

Note, to add "aspiration" to a sound, you add the corresponding "h" symbol after the main symbol. To add nasalization to a vowel, you add a tilde below the vowel. Long vowels are made by writing two vowel letters.

The letter `i#` is roughly `/ɨ/`, which is pronounced with the shape of your lips like a `u`, saying `i`, with the inside of the mouth like an `i`.

The letter `a#` is roughly `/ø/`, which is pronounced with the shape of your lips like a `u`, saying `i`, but with the inside of the mouth like an `e`.

The letter `u#` is roughly `/ɹ/`, which is pronounced like the English `r`. Lips are shaped like a `u`, saying an `e`, with the inside of the mouth like a `U`.

The letter `o#` is roughly `/ɔ/`, which is pronounced like the British English `a`. Lips are shaped like a `o`, saying an `a`.

The letter `e#` is roughly `/œ/`, which is pronounced with the shape of your lips like an `o`, saying an `U`.

The [K](https://www.youtube.com/watch?v=rgtWtDwMIhA) sound is a deeper k sound pronounced at the bottom of your throat.

Ejective sounds are produced like you are beat boxing.

Tones are produced like you are on a musical scale, only slightly less exaggerated.

Retroflex sounds are produced with the tip of the tongue on the high part of the roof of your mouth.

[Pharyngealized sounds](https://www.youtube.com/watch?v=yG967iHMnVE) and [Velarized sounds](https://www.youtube.com/watch?v=E3pcu5vFjtI) are produced by sucking your tongue back when you say the consonant.

Labial sounds are produced by rounding your lips when saying the sound.

[Palatalized sounds](https://www.youtube.com/watch?v=H-W327PH5Ns) are produced with a thin y at after the consonant.

[Chinese retroflex sounds](https://www.youtube.com/watch?v=dpQ3IMd4AMg).

## Sound Variation

The `W` is for labialization, `Y` for palatalization, `h` for aspiration, `Q~` for phayrngeal stop, `~` for pharyngealization, `M` for nasalization, and `$` for non-aspirated stop.

<p align="center">
  <img src="https://github.com/teamdrumwork/call/blob/make/variations.png?raw=true" />
</p>

## Vowel Symbols

Here are all the possible vowel combinations. The combination elements are: tone (1, 2, 3, 4, or 5, 1 being the lowest, 5 being the highest), nasality, and stress. In languages with only 3 tones you can just use tones 2, 3, and 4, but in languages with 5 tones you need all 5. Nasality is done with a tilde below the vowel. Stress is done with one dot above the vowel. Low tones tilt to the left, high tones to the right.

<p align="center">
  <img src="https://github.com/teamdrumwork/call/blob/make/vowels.png?raw=true" />
</p>

<h3 id="license">License</h3>

Copyright 2021-2022 <a href='https://drum.work'>DrumWork</a>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

### DrumWork

This is being developed by the folks at [DrumWork](https://drum.work), a California-based project for helping humanity master information and computation. DrumWork started off in the winter of 2008 as a spark of an idea, to forming a company 10 years later in the winter of 2018, to a seed of a project just beginning its development phases. It is entirely bootstrapped by working full time and running [Etsy](https://etsy.com/shop/teamdrumwork) and [Amazon](https://www.amazon.com/s?rh=p_27%3AMount+Build) shops. Also find us on [Facebook](https://www.facebook.com/teamdrumwork), [Twitter](https://twitter.com/teamdrumwork), and [LinkedIn](https://www.linkedin.com/company/teamdrumwork). Check out our other GitHub projects as well!
