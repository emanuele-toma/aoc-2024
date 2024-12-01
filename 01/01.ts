import fs from 'fs';

const INPUT = fs.readFileSync('./01/input.advent_of_code.txt', 'utf-8').trim().split('\n');

const left = INPUT.map(line => parseInt(line.split('   ')[0])).sort((a, b) => a - b);
const right = INPUT.map(line => parseInt(line.split('   ')[1])).sort((a, b) => a - b);

const distances = left.map((l, i) => Math.abs(l - right[i]));
const sum = distances.reduce((acc, cur) => acc + cur, 0);

console.log(sum);
