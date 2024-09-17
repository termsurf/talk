import lowercase from '~/make/data/lowercase.json'
import capital from '~/make/data/capital.json'
import other from '~/make/data/other.json'
import diacritics from '~/make/data/diacritics.json'

export type MarkInfo = {
  'X-SAMPA': string
  IPA: string
}

const TABLE: Array<MarkInfo> = [
  ...(lowercase as Array<MarkInfo>),
  ...(capital as Array<MarkInfo>),
  ...(other as Array<MarkInfo>),
  ...(diacritics as Array<MarkInfo>),
]

export default TABLE

export const XSAMPA: Record<string, number> = {}
export const IPA: Record<string, number> = {}

for (const [i, e] of TABLE.entries()) {
  XSAMPA[e['X-SAMPA']] = i
  IPA[e['IPA']] = i
}

export const XSAMPA_PATTERN = new RegExp(
  '(' +
    Object.keys(XSAMPA)
      .filter(x => !!x)
      .map(escape)
      .join('|') +
    ')',
  'g',
)

export const IPA_PATTERN = new RegExp(
  '(' +
    Object.keys(IPA)
      .filter(x => !!x)
      .map(escape)
      .join('|') +
    ')',
  'g',
)

export function escape(text: string) {
  return text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}
