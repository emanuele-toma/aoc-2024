import fs from 'fs';

const INPUT = fs.readFileSync('./02/input.advent_of_code.txt', 'utf-8').split('\n');

let safe = 0;

const isAsc = (arr: number[], pardon = true) => {
  const errors = [];

  for (let i = 0; i < arr.length - 1; i++) {
    const diff = arr[i + 1] - arr[i];
    if (diff < 1 || diff > 3) {
      errors.push(i);
      errors.push(i + 1);
    }
  }

  if (errors.length <= 1) return true;

  if (pardon) {
    for (const error of errors) {
      const newArr = arr.slice();
      newArr.splice(error, 1);
      if (isAsc(newArr, false)) return true;
    }
    return false;
  }

  if (errors.length > 0) return false;
  return true;
};

const isDesc = (arr: number[], pardon = true) => {
  const errors = [];

  for (let i = 0; i < arr.length - 1; i++) {
    const diff = arr[i] - arr[i + 1];
    if (diff < 1 || diff > 3) {
      errors.push(i);
      errors.push(i + 1);
    }
  }

  if (errors.length <= 1) return true;

  if (pardon) {
    for (const error of errors) {
      const newArr = arr.slice();
      newArr.splice(error, 1);
      if (isDesc(newArr, false)) return true;
    }
    return false;
  }

  if (errors.length > 0) return false;
  return true;
};

for (const line of INPUT) {
  const levels = line.split(' ').map(Number);
  let greater = 0;
  let lower = 0;

  for (let i = 0; i < levels.length - 1; i++) {
    if (levels[i] > levels[i + 1]) greater++;
    if (levels[i] < levels[i + 1]) lower++;
  }

  const order = greater - lower;

  // desc
  if (order > 0) {
    if (isDesc(levels)) safe++;
  }

  // asc
  if (order < 0) {
    if (isAsc(levels)) safe++;
  }

  if (order === 0) {
    if (isAsc(levels) || isDesc(levels)) safe++;
  }
}

console.log(safe);
