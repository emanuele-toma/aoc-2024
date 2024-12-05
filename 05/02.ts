import fs from 'fs';

const INPUT = fs.readFileSync('./05/input.advent_of_code.txt', 'utf-8');

const [rules, updates] = INPUT.split('\n\n').map(part => part.split('\n'));

const rulesDict: Record<number, number[]> = {};

for (const rule of rules) {
  const [key, value] = rule.split('|').map(Number);
  if (!rulesDict[key]) {
    rulesDict[key] = [];
  }
  rulesDict[key].push(value);
}

const correctUpdates: number[][] = [];

for (const update of updates) {
  const entries = update.split(',').map(Number);

  let correct = true;

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const before = entries.slice(0, i);
    const rule = rulesDict[entry];

    if (rule === undefined) continue;
    for (let j = 0; j < before.length; j++) {
      const e = before[j];
      if (rule.includes(e)) {
        correct = false;

        // swap the two elements
        const temp = entries[i];
        entries[i] = entries[j];
        entries[j] = temp;
        i = 0;
        break;
      }
    }
  }

  if (!correct) correctUpdates.push(entries);
}

const calcResults = (arr: number[][]) => {
  let sum = 0;
  for (const entries of arr) {
    sum += entries[(entries.length - 1) / 2];
  }
  return sum;
};

console.log(calcResults(correctUpdates));
