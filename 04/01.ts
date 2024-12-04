import fs from 'fs';

const INPUT = fs
  .readFileSync('./04/input.advent_of_code.txt', 'utf-8')
  .split('\n')
  .map(line => line.split(''));

const checkHorizontal = (x: number, y: number, arr: string[][]) => {
  return (arr?.[y]?.slice(x, x + 4)?.join('') || '') === 'XMAS' ? 1 : 0;
};

const checkHorizontalInverse = (x: number, y: number, arr: string[][]) => {
  return (arr?.[y]
    ?.slice(x - 3, x + 1)
    ?.reverse()
    ?.join('') || '') === 'XMAS'
    ? 1
    : 0;
};

const checkVertical = (x: number, y: number, arr: string[][]) => {
  let word = '';

  for (let i = 0; i < 4; i++) {
    word += arr?.[y + i]?.[x] ?? '';
  }

  return word === 'XMAS' ? 1 : 0;
};

const checkVerticalInverse = (x: number, y: number, arr: string[][]) => {
  let word = '';

  for (let i = 0; i < 4; i++) {
    word += arr?.[y - i]?.[x] ?? '';
  }

  return word === 'XMAS' ? 1 : 0;
};

const checkDiagonal = (x: number, y: number, arr: string[][]) => {
  const dirs = [-1, 1];

  let c = 0;

  for (const dirY of dirs) {
    for (const dirX of dirs) {
      let word = '';

      for (let i = 0; i < 4; i++) {
        word += arr?.[y + i * dirY]?.[x + i * dirX] ?? '';
      }

      if (word === 'XMAS') {
        c++;
      }
    }
  }

  return c;
};

let count = 0;

for (let y = 0; y < INPUT.length; y++) {
  for (let x = 0; x < INPUT[y].length; x++) {
    if (INPUT[y][x] === 'X') {
      const functions = [checkHorizontal, checkHorizontalInverse, checkVertical, checkVerticalInverse, checkDiagonal];

      for (const fn of functions) {
        count += fn(x, y, INPUT);
      }
    }
  }
}

console.log(count);
