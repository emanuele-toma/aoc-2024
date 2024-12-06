import fs from 'fs';

const INPUT = fs.readFileSync('./06/input.advent_of_code.txt', 'utf-8');

const GRID = INPUT.split('\n').map(row => row.split(''));

const getCoords = (x: number, y: number, GRID: string[][]) => GRID[y]?.[x];
const findByValue = (value: string) =>
  GRID.flatMap((row, y) => row.map((cell, x) => (cell === value ? { x, y } : null))).filter(Boolean);

const start = findByValue('^')[0];

if (!start) {
  throw new Error('Start not found');
}

enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
}

let direction: Direction = Direction.Up;

const visited: string[] = [];

const getNextDirection = () => {
  const next = {
    [Direction.Up]: Direction.Right,
    [Direction.Right]: Direction.Down,
    [Direction.Down]: Direction.Left,
    [Direction.Left]: Direction.Up,
  }[direction];

  return next;
};

const move = (x: number, y: number, GRID: string[][]) => {
  visited.push(`^${x},${y}$`);

  let next: { x: number; y: number };
  let isObstacle: boolean;

  do {
    next = {
      [Direction.Up]: { x, y: y - 1 },
      [Direction.Down]: { x, y: y + 1 },
      [Direction.Left]: { x: x - 1, y },
      [Direction.Right]: { x: x + 1, y },
    }[direction];

    isObstacle = getCoords(next.x, next.y, GRID) === '#';
    if (isObstacle) {
      direction = getNextDirection();
    }
  } while (isObstacle);

  const isOutOfBounds = getCoords(next.x, next.y, GRID) === undefined;

  if (isOutOfBounds) {
    return 'END';
  }

  return next;
};

const emptyLocations = GRID.flatMap((row, y) => row.map((cell, x) => (cell === '.' ? { x, y } : null))).filter(
  Boolean,
) as {
  x: number;
  y: number;
}[];

let loops = 0;
let currentCheck = 0;

for (const { x, y } of emptyLocations) {
  currentCheck++;

  const newGrid = GRID.map(row => [...row]);
  newGrid[y][x] = '#';

  let end = false;
  let current = start;
  let iterations = 0;

  visited.length = 0;
  direction = Direction.Up;

  do {
    iterations++;
    const next = move(current.x, current.y, newGrid);

    if (next === 'END') {
      end = true;
    } else {
      current = next;
    }
  } while (!end && iterations < 15000);

  if (currentCheck % 200 === 0) console.log(`Check ${currentCheck} / ${emptyLocations.length}`);

  if (!end) {
    loops++;
  }
}

console.log(loops);
