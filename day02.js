const { readFileSync } = require('fs')
const { join } = require('path')

const dataFile = 'day02'
const fileName = process.argv[2] ? `${dataFile}_${process.argv[2]}.txt` : `${dataFile}.txt`
const data = readFileSync(join(__dirname, 'data', fileName), 'utf8')
const dataArr = data.split('\n').filter(x => !!x)
const reports = dataArr.map(x => x.split(' ')).map(x => x.map(y => Number(y)))

const iSafe = (report) => {
  const check = report[0] < report[1] ? (a, b) => a < b : (a, b) => a > b
  for (let i = 0; i < report.length - 1; i++) {
    if (!check(report[i], report[i + 1])) {
      return false
    }
    const diff = Math.abs(report[i] - report[i + 1])
    if (diff < 1 || diff > 3) {
      return false
    }
  }
  return true
}

const part1 = () => {
  let ret = 0
  for (const report of reports) {
    if (iSafe(report)) {
      ret += 1
    }
  }
  console.log(ret)
}

const part2 = () => {
  let ret = 0
  for (const report of reports) {
    if (iSafe(report)) {
      ret += 1
    } else {
      for (let i = 0; i < report.length - 1; i++) {
        const newReport = [...report.slice(0, i), ...report.slice(i + 1, report.length)]
        if (iSafe(newReport)) {
          ret += 1
        }
      }
    }
  }
  console.log(ret)
}

part1()
part2()
