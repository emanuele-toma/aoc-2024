import fs from 'fs';

const INPUT = fs.readFileSync('./06/input.advent_of_code.txt', 'utf-8');

const GRID = INPUT.split('\n').map(row => row.split(''));

const getCoords = (x: number, y: number) => GRID[y]?.[x];
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

const visited = new Set<string>();

const getNextDirection = () => {
  const next = {
    [Direction.Up]: Direction.Right,
    [Direction.Right]: Direction.Down,
    [Direction.Down]: Direction.Left,
    [Direction.Left]: Direction.Up,
  }[direction];

  return next;
};

const move = (x: number, y: number) => {
  visited.add(`${x},${y}`);

  let next: { x: number; y: number };
  let isObstacle: boolean;

  do {
    next = {
      [Direction.Up]: { x, y: y - 1 },
      [Direction.Down]: { x, y: y + 1 },
      [Direction.Left]: { x: x - 1, y },
      [Direction.Right]: { x: x + 1, y },
    }[direction];

    isObstacle = getCoords(next.x, next.y) === '#';
    if (isObstacle) {
      direction = getNextDirection();
    }
  } while (isObstacle);

  const isOutOfBounds = getCoords(next.x, next.y) === undefined;

  if (isOutOfBounds) {
    return 'END';
  }

  return next;
};

let end = false;
let current = start;

do {
  const next = move(current.x, current.y);

  if (next === 'END') {
    end = true;
  } else {
    current = next;
  }
} while (!end);

console.log(visited.size);
