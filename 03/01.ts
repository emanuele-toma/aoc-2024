import fs from 'fs';

const INPUT = fs.readFileSync('./03/input.advent_of_code.txt', 'utf-8');

const regex = /mul\((\d*),(\d*)\)/g;
const matches = INPUT.match(regex);

if (!matches) {
  throw new Error('No matches found');
}

let result = 0;
for (const match of matches) {
  const a = parseInt(match.split(',')[0].split('(')[1]);
  const b = parseInt(match.split(',')[1].split(')')[0]);

  result += a * b;
}

console.log(result);
