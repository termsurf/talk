import { ipa2xsampa } from 'x-sampa-ipa'
import makeTalkToIpa from './ipa.js'

export default function make(text: string) {
  return ipa2xsampa(makeTalkToIpa(text)) as string
}
