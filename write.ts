import { CONSONANTS } from '~/make/talk'
import talkToIpa from '~/make/talk/ipa'

console.log(
  CONSONANTS.map(({ i, o }) => {
    return `| ${talkToIpa(i)} | ${i} | ${o} |`
  }).join('\n'),
)
