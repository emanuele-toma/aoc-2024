import fs from 'fs';

const INPUT = fs.readFileSync('./09/input.advent_of_code.txt', 'utf-8');

const DISK_MAP = INPUT.trim().split('').map(Number);

let isFile = true;
let fileSystem: string[] = [];
let id = 0;

DISK_MAP.forEach(value => {
  let char = isFile ? id.toString() : '.';

  if (isFile) id++;

  for (let i = 0; i < value; i++) {
    fileSystem.push(char);
  }
  isFile = !isFile;
});

const isDone = (fileSystem: string[]) => {
  return !fileSystem.some((v, i) => v === '.' && fileSystem[i + 1] !== '.' && fileSystem[i + 1] !== undefined);
};

const firstDot = (fileSystem: string[]) => {
  return fileSystem.findIndex((v, i) => v === '.');
};

const lastNumber = (fileSystem: string[]) => {
  for (let i = fileSystem.length - 1; i >= 0; i--) {
    if (fileSystem[i] !== '.') {
      return i;
    }
  }
  throw new Error('No number found');
};

const calcCheckSum = (fileSystem: string[]) => {
  let sum = 0;

  for (let i = 0; i < fileSystem.length; i++) {
    if (fileSystem[i] !== '.') {
      sum += i * parseInt(fileSystem[i]);
    }
  }

  return sum;
};

while (!isDone(fileSystem)) {
  const first = firstDot(fileSystem);
  const last = lastNumber(fileSystem);
  const temp = fileSystem[first];
  fileSystem[first] = fileSystem[last];
  fileSystem[last] = temp;
}

console.log(calcCheckSum(fileSystem));
