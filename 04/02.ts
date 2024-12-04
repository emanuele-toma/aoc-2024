import fs from 'fs';

const INPUT = fs
  .readFileSync('./04/input.advent_of_code.txt', 'utf-8')
  .split('\n')
  .map(line => line.split(''));

const checkCount = (...args: string[]) => {
  let M = 0;
  let S = 0;

  for (const arg of args) {
    if (arg === 'M') M++;
    if (arg === 'S') S++;
  }

  return M === 2 && S === 2;
};

const checkMas = (arr: string[][], x: number, y: number) => {
  const dirs = [-1, 1];
  for (const dirY of dirs) {
    for (const dirX of dirs) {
      if (!arr[y + dirY] || !arr[y + dirY][x + dirX]) {
        return 0;
      }
    }
  }

  const topL = arr[y - 1][x - 1];
  const topR = arr[y - 1][x + 1];
  const bottomL = arr[y + 1][x - 1];
  const bottomR = arr[y + 1][x + 1];

  if (!checkCount(topL, topR, bottomL, bottomR)) return 0;

  const rows = [topL + topR, bottomL + bottomR];
  const cols = [topL + bottomL, topR + bottomR];

  const rowsEqual = rows[0] === rows[1];
  const colsEqual = cols[0] === cols[1];

  if (rowsEqual) {
    if (colsEqual) return 0;
    if (rows[0] === cols[0] || rows[0] === cols[1]) return 0;
    return 1;
  }

  if (colsEqual) {
    if (cols[0] === rows[0] || cols[0] === rows[1]) return 0;
    return 1;
  }

  return 0;
};

let c = 0;

for (let y = 1; y < INPUT.length - 1; y++) {
  for (let x = 1; x < INPUT[y].length - 1; x++) {
    if (INPUT[y][x] === 'A') {
      c += checkMas(INPUT, x, y);
    }
  }
}

console.log(c);
