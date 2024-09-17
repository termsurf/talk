import TABLE, { XSAMPA, XSAMPA_PATTERN } from '~/make/data/index.js'

export default function make(text: string) {
  return text.replace(XSAMPA_PATTERN, xs => {
    if (!xs) {
      return ''
    }
    const i = XSAMPA[xs]!
    const x = TABLE[i]!.IPA
    return x
  })
}
