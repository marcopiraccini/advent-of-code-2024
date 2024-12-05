const { readFileSync } = require('fs')
const { join } = require('path')

const dataFile = 'day05'
const fileName = process.argv[2] ? `${dataFile}_${process.argv[2]}.txt` : `${dataFile}.txt`
const data = readFileSync(join(__dirname, 'data', fileName), 'utf8')
const dataArr = data.split('\n').filter(x => !!x)

const middle = (arr) => {
  const len = arr.length
  const m = Math.floor(len / 2)
  return arr[m]
}

const rules = {}
const updates = []

for (const line of dataArr) {
  if (line.includes('|')) {
    const first = line.split('|').map(x => parseInt(x))[0]
    const second = line.split('|').map(x => parseInt(x))[1]
    rules[first] = rules[first] || []
    rules[first].push(second)
  } else if (line.includes(',')) {
    updates.push(line.split(',').map(x => parseInt(x)))
  }
}
const includesAny = (arr, values) => values.some(v => arr.includes(v))

const isOk = (update) => {
  for (let i = 0; i < update.length; i++) {
    if (rules[update[i]]) {
      const seconds = rules[update[i]]
      const firstPart = update.slice(0, i)
      if (includesAny(firstPart, seconds)) {
        return false
      }
    }
  }
  return true
}

const part1 = () => {
  let res = 0
  for (const update of updates) {
    if (isOk(update)) {
      res += middle(update)
    }
  }
  console.log('part1:', res)
}

const part2 = () => {
  let res = 0
  const wrongs = []
  for (const update of updates) {
    if (!isOk(update)) {
      wrongs.push(update)
    }
  }

  for (const wrong of wrongs) {
    const current = [...wrong]
    while (!isOk(current)) {
      for (let i = current.length; i > 0; i--) {
        const el = current[i]
        if (rules[el]) {
          for (let j = 0; j < i; j++) {
            if (rules[el].includes(current[j])) {
              const app = current[j]
              current[j] = el
              current[i] = app
              break
            }
          }
        }
      }
    }
    res += middle(current)
  }
  console.log('part2:', res)
}

part1()
part2()
