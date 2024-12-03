import fs from 'fs';

const INPUT = fs.readFileSync('./03/input.advent_of_code.txt', 'utf-8');

const regex = /(mul\((\d*),(\d*)\)|do\(\)|don\'t\(\))/g;
const matches = INPUT.match(regex);

if (!matches) {
  throw new Error('No matches found');
}

const filtered = [];
let action: 'keep' | 'remove' = 'keep';
for (const match of matches) {
  if (match === 'do()') {
    action = 'keep';
    continue;
  }

  if (match === "don't()") {
    action = 'remove';
    continue;
  }

  if (action === 'keep') {
    filtered.push(match);
  }
}

let result = 0;
for (const match of filtered) {
  const a = parseInt(match.split(',')[0].split('(')[1]);
  const b = parseInt(match.split(',')[1].split(')')[0]);

  result += a * b;
}

console.log(result);
