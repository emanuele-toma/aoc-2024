import fs from 'fs';

const INPUT = fs.readFileSync('./02/input.advent_of_code.txt', 'utf-8').split('\n');

let safe = 0;

const isAsc = (arr: number[]) => {
  for (let i = 0; i < arr.length - 1; i++) {
    const diff = arr[i + 1] - arr[i];
    if (diff < 1 || diff > 3) return false;
  }
  return true;
};

const isDesc = (arr: number[]) => {
  for (let i = 0; i < arr.length - 1; i++) {
    const diff = arr[i] - arr[i + 1];
    if (diff < 1 || diff > 3) return false;
  }
  return true;
};

for (const line of INPUT) {
  const levels = line.split(' ').map(Number);
  const order = levels[0] - levels[1];
  if (order === 0) continue;

  // desc
  if (order > 0) {
    if (isDesc(levels)) safe++;
  }

  // asc
  if (order < 0) {
    if (isAsc(levels)) safe++;
  }
}

console.log(safe);
