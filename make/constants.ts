export type TextList = Record<string, string>

export const m: { d: TextList; u: TextList } = {
  d: {
    acute: '\u0317',
    ddot: '\u0324',
    dot: '\u0323',
    down: '\u032C',
    grave: '\u0316',
    ring: '\u0325',
    tilde: '\u0330',
  },
  u: {
    acute: '\u0301',
    dacute: '\u030B',
    ddot: '\u0308',
    dgrave: '\u030F',
    dot: '\u0307',
    down: '\u030C',
    grave: '\u0300',
    macron: '\u0304',
    ring: '\u030A',
    tilde: '\u0303',
    up: '\u0302',
  },
}
