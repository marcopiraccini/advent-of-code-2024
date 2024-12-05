const { readFileSync } = require('fs')
const { join } = require('path')

const dataFile = 'day01'
const fileName = process.argv[2] ? `${dataFile}_${process.argv[2]}.txt` : `${dataFile}.txt`
const data = readFileSync(join(__dirname, 'data', fileName), 'utf8')
const dataArr = data.split('\n').filter(x => !!x)
const col0 = dataArr.map(x => (x.split('   ')[0])).sort((a, b) => a - b).map(x => Number(x))
const col1 = dataArr.map(x => (x.split('   ')[1])).sort((a, b) => a - b).map(x => Number(x)
)
const part1 = () => {
  let res = 0
  for (let i = 0; i < col0.length; i++) {
    res += Math.abs(col1[i] - col0[i])
  }
  console.log('part1:', res)
}

const part2 = () => {
  const col1Map = {}
  for (let i = 0; i < col1.length; i++) {
    col1Map[col1[i]] = col1Map[col1[i]] ? col1Map[col1[i]] + 1 : 1
  }
  let res = 0
  for (let i = 0; i < col0.length; i++) {
    const numberOfTimes = col1Map[col0[i]] || 0
    res += col0[i] * numberOfTimes
  }
  console.log('part2:', res)
}

part1()
part2()
