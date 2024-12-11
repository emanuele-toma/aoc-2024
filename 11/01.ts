import fs from 'fs';

const INPUT = fs.readFileSync('./11/input.advent_of_code.txt', 'utf-8');

const STONES = INPUT.trim().split(' ').map(Number);

const blink = (STONES: number[]) => {
  for (let index = 0; index < STONES.length; ) {
    const stone = STONES[index];

    if (stone === 0) {
      STONES[index] = 1;
      index++;
      continue;
    }

    const stoneString = stone.toString();
    if (stoneString.length % 2 === 0) {
      const firstHalf = parseInt(stoneString.slice(0, stoneString.length / 2));
      const secondHalf = parseInt(stoneString.slice(stoneString.length / 2));

      STONES[index] = firstHalf;
      STONES.splice(index + 1, 0, secondHalf);
      index += 2;
      continue;
    }

    STONES[index] = STONES[index] * 2024;
    index++;
  }
};

for (let i = 0; i < 25; i++) {
  blink(STONES);
}

console.log(STONES.length);
