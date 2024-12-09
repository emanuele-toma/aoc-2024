import fs from 'fs';

const INPUT = fs.readFileSync('./09/input.advent_of_code.txt', 'utf-8');

const DISK_MAP = INPUT.trim().split('').map(Number);

let isFile = true;

type FileSystem = {
  id: string;
  size: number;
  ignored: boolean;
};

let fileSystem: FileSystem[] = [];

let id = 0;

DISK_MAP.forEach(value => {
  let char = isFile ? id.toString() : '.';

  fileSystem.push({
    id: char,
    size: value,
    ignored: false,
  });

  if (isFile) id++;
  isFile = !isFile;
});

function getLastFileIndex(fs: FileSystem[]) {
  for (let i = fs.length - 1; i >= 0; i--) {
    if (!fs[i].ignored && fs[i].id !== '.') {
      fs[i].ignored = true;
      return i;
    }
  }
  return -1;
}

function getFirstSpace(fs: FileSystem[], minSize: number) {
  for (let i = 0; i < fs.length; i++) {
    if (fs[i].id === '.' && fs[i].size >= minSize) {
      return i;
    }
  }
  return -1;
}

function insertSpace(fs: FileSystem[], index: number, size: number) {
  fs.splice(index, 0, {
    id: '.',
    size,
    ignored: false,
  });
}

function calcChecksum(fs: FileSystem[]) {
  const flat: string[] = [];

  for (let i = 0; i < fs.length; i++) {
    for (let j = 0; j < fs[i].size; j++) {
      flat.push(fs[i].id);
    }
  }

  let sum = 0;

  for (let i = 0; i < flat.length; i++) {
    if (flat[i] !== '.') {
      sum += parseInt(flat[i]) * i;
    }
  }

  return sum;
}

for (let i = 0; i < fileSystem.length; i++) {
  const lastFileIndex = getLastFileIndex(fileSystem);
  if (lastFileIndex === -1) {
    break;
  }
  const file = fileSystem[lastFileIndex];

  const firstSpaceIndex = getFirstSpace(fileSystem, file.size);
  if (firstSpaceIndex === -1 || firstSpaceIndex >= lastFileIndex) {
    continue;
  }
  const space = fileSystem[firstSpaceIndex];

  const spaceSize = space.size - file.size;

  space.size = file.size;
  space.id = file.id;
  space.ignored = true;

  file.id = '.';
  file.ignored = false;

  if (spaceSize > 0) {
    insertSpace(fileSystem, firstSpaceIndex + 1, spaceSize);
  }
}

console.log(calcChecksum(fileSystem));
