import TABLE, { IPA, IPA_PATTERN } from '~/make/data/index.js'

export default function make(text: string) {
  return text.replace(IPA_PATTERN, ipa => {
    if (!ipa) {
      return ''
    }
    const i = IPA[ipa]!
    const x = TABLE[i]!['X-SAMPA']
    return x
  })
}
