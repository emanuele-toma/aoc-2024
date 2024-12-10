import fs from 'fs';

const INPUT = fs.readFileSync('./10/input.advent_of_code.txt', 'utf-8');

const TOPOGRAPHIC_MAP = INPUT.trim()
  .split('\n')
  .map(row => row.trim().split('').map(Number));

const STARTING_POINTS: { x: number; y: number }[] = [];

TOPOGRAPHIC_MAP.forEach((row, y) => {
  row.forEach((value, x) => {
    if (value === 0) {
      STARTING_POINTS.push({ x, y });
    }
  });
});

const visit = (x: number, y: number, map: number[][]) => {
  let count = 0;

  const current = map[y][x];

  if (current === 9) {
    return 1;
  }

  const directions = [
    [x, y - 1],
    [x, y + 1],
    [x - 1, y],
    [x + 1, y],
  ];

  directions.forEach(([x, y]) => {
    const value = map[y]?.[x];
    if (value === current + 1) {
      count += visit(x, y, map);
    }
  });

  return count;
};

const result = STARTING_POINTS.map(({ x, y }) => visit(x, y, TOPOGRAPHIC_MAP));
const sum = result.reduce((acc, curr) => acc + curr, 0);

console.log(sum);
