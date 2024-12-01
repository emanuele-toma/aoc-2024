import fs from 'fs';

const INPUT = fs.readFileSync('./01/input.txt', 'utf-8').trim().split('\n');

const left = INPUT.map(line => parseInt(line.split('   ')[0])).sort((a, b) => a - b);
const right = INPUT.map(line => parseInt(line.split('   ')[1])).sort((a, b) => a - b);

let similarity = 0;

const similitaries: { [key: number]: number } = {};

for (const l of left) {
  const s = similitaries[l];
  if (s) {
    similarity += s;
    continue;
  }

  const occurences = right.filter(r => r === l).length;
  similitaries[l] = l * occurences;
  similarity += l * occurences;
}

console.log(similarity);
