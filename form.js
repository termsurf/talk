
const list = require('./list')

const look = list.reduce((m, data) => {
  m[data.doob] = '^' + data.doob.replace(/[\(\)\*\!\?\_\.\[\]\|\\\/]/g, _ => `\\${_}`)
  return m
}, {})

const form = (text, type) => {
  let remaining = text.replace(/[A-Z]/g, _ => _.toLowerCase() + '_')
  let output = []
  // return
  a:
  while (remaining.length) {
    b:
    for (let i = 0, n = list.length; i < n; i++) {
      const data = list[i]
      const pattern = look[data.doob]
      const regex = new RegExp(pattern)
      let match = remaining.match(regex)
      if (match) {
        output.push(data[type])
        remaining = remaining.substr(match[0].length)
        continue a
      }
    }
    break
  }
  return output.join('')
}

module.exports = form