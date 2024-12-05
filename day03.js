const { readFileSync } = require('fs')
const { join } = require('path')

const dataFile = 'day03'
const fileName = process.argv[2] ? `${dataFile}_${process.argv[2]}.txt` : `${dataFile}.txt`
const data = readFileSync(join(__dirname, 'data', fileName), 'utf8')

const part1 = () => {
  const mulRegex = /mul\([0-9]+,[0-9]+\)/g
  const muls = [...data.matchAll(mulRegex)]
  let res = 0
  for (const mul of muls) {
    const [a, b] = mul[0].slice(4, -1).split(',')
    res += a * b
  }
  console.log('part1:', res)
}

const part2 = () => {
  const mulRegex = /mul\([0-9]+,[0-9]+\)|do\(\)|don't\(\)/g
  const ops = [...data.matchAll(mulRegex)]
  let enabled = true
  let res = 0
  for (const op of ops) {
    if (op[0] === 'do()') {
      enabled = true
    } else if (op[0] === "don't()") {
      enabled = false
    } else if (enabled) {
      const [a, b] = op[0].slice(4, -1).split(',')
      res += a * b
    }
  }
  console.log('part2:', res)
}

part1()
part2()
