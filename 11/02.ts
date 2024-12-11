import fs from 'fs';

const INPUT = fs.readFileSync('./11/input.advent_of_code.txt', 'utf-8');

const STONES = INPUT.trim().split(' ').map(Number);

const memoize = <T extends (...args: any[]) => any>(fn: T) => {
  const cache: Record<string, ReturnType<T>> = {};

  return (...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (cache[key] === undefined) {
      cache[key] = fn(...args);
    }

    return cache[key];
  };
};

const blink = memoize((stone: number, depth: number): number => {
  if (depth === 0) return 1;
  if (stone === 0) return blink(1, depth - 1);

  const stoneString = stone.toString();
  if (stoneString.length % 2 === 0) {
    const firstHalf = parseInt(stoneString.slice(0, stoneString.length / 2));
    const secondHalf = parseInt(stoneString.slice(stoneString.length / 2));

    return blink(firstHalf, depth - 1) + blink(secondHalf, depth - 1);
  }

  return blink(stone * 2024, depth - 1);
});

let sum = 0;
for (let i = 0; i < STONES.length; i++) {
  const stone = STONES[i];
  sum += blink(stone, 75);
  console.log(`Progress: ${i + 1}/${STONES.length}`);
}
console.log(sum);
