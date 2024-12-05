const { readFileSync } = require('fs')
const { join } = require('path')

const dataFile = 'day04'
const fileName = process.argv[2] ? `${dataFile}_${process.argv[2]}.txt` : `${dataFile}.txt`
const data = readFileSync(join(__dirname, 'data', fileName), 'utf8')
const dataArr = data.split('\n').filter(x => !!x)
const mat = dataArr.map(x => x.split(''))

const xmas = ['X', 'M', 'A', 'S']

const checkBackWard = (i, j) => {
  try {
    let str = ''
    for (let k = 0; k < xmas.length; k++) {
      str += mat[i][j - k]
    }
    return str === xmas.join('') ? 1 : 0
  } catch (e) {
    return 0
  }
}

const checkForward = (i, j) => {
  try {
    let str = ''
    for (let k = 0; k < xmas.length; k++) {
      str += mat[i][j + k]
    }
    return str === xmas.join('') ? 1 : 0
  } catch (e) {
    return 0
  }
}

const checkDown = (i, j) => {
  try {
    let str = ''
    for (let k = 0; k < xmas.length; k++) {
      str += mat[i + k][j]
    }
    return str === xmas.join('') ? 1 : 0
  } catch (e) {
    return 0
  }
}

const checkUp = (i, j) => {
  try {
    let str = ''
    for (let k = 0; k < xmas.length; k++) {
      str += mat[i - k][j]
    }
    return str === xmas.join('') ? 1 : 0
  } catch (e) {
    return 0
  }
}

const checkDiagonalDownRight = (i, j) => {
  try {
    let str = ''
    for (let k = 0; k < xmas.length; k++) {
      str += mat[i + k][j + k]
    }
    return str === xmas.join('') ? 1 : 0
  } catch (e) {
    return 0
  }
}

const checkDiagonalDownLeft = (i, j) => {
  try {
    let str = ''
    for (let k = 0; k < xmas.length; k++) {
      str += mat[i + k][j - k]
    }
    return str === xmas.join('') ? 1 : 0
  } catch (e) {
    return 0
  }
}

const checkDiagonalUpRight = (i, j) => {
  try {
    let str = ''
    for (let k = 0; k < xmas.length; k++) {
      str += mat[i - k][j + k]
    }
    return str === xmas.join('') ? 1 : 0
  } catch (e) {
    return 0
  }
}

const checkDiagonalUpLeft = (i, j) => {
  try {
    let str = ''
    for (let k = 0; k < xmas.length; k++) {
      str += mat[i - k][j - k]
    }
    return str === xmas.join('') ? 1 : 0
  } catch (e) {
    return 0
  }
}

const checkAll = (i, j) => {
  return checkBackWard(i, j) +
    checkForward(i, j) +
    checkDown(i, j) +
    checkUp(i, j) +
    checkDiagonalDownRight(i, j) +
    checkDiagonalDownLeft(i, j) +
    checkDiagonalUpRight(i, j) +
    checkDiagonalUpLeft(i, j)
}

// We search every 'X', then we check in every direction

const part1 = () => {
  let res = 0
  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[i].length; j++) {
      if (mat[i][j] === 'X') {
        res += checkAll(i, j)
      }
    }
  }
  console.log('part1:', res)
}

const mas = ['M', 'A', 'S']
const checkMasDiagonalLeft = (i, j) => {
  try {
    const str = mat[i - 1][j - 1] + mat[i][j] + mat[i + 1][j + 1]
    return (str === mas.join('') || str === mas.reverse().join('')) ? 1 : 0
  } catch (e) {
    return 0
  }
}

const checkMasDiagonalRight = (i, j) => {
  try {
    const str = mat[i - 1][j + 1] + mat[i][j] + mat[i + 1][j - 1]
    return (str === mas.join('') || str === mas.reverse().join('')) ? 1 : 0
  } catch (e) {
    return 0
  }
}

const checkMas = (i, j) => {
  if (checkMasDiagonalLeft(i, j) && checkMasDiagonalRight(i, j)) {
    return 1
  }
  return 0
}

const part2 = () => {
  let res = 0
  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[i].length; j++) {
      if (mat[i][j] === 'A') {
        res += checkMas(i, j)
      }
    }
  }
  console.log('part2:', res)
}

part1()
part2()
