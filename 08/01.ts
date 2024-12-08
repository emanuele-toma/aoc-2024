import fs from 'fs';

const INPUT = fs.readFileSync('./08/input.advent_of_code.txt', 'utf-8');

const MAP = INPUT.split('\n').map(line => line.split(''));
const MAP_COPY = MAP.map(line => [...line]);

const ANTENNAS = new Set<string>();

MAP.forEach(line => {
  line.forEach(cell => {
    if (cell !== '.') {
      ANTENNAS.add(cell);
    }
  });
});

const calcDistance = (x1: number, y1: number, x2: number, y2: number) => {
  return {
    x: x2 - x1,
    y: y2 - y1,
  };
};

const findAllAntennas = (antenna: string, MAP: string[][]) => {
  const antennas: { x: number; y: number }[] = [];
  MAP.forEach((line, y) => {
    line.forEach((cell, x) => {
      if (cell === antenna) {
        antennas.push({ x, y });
      }
    });
  });
  return antennas;
};

const countAntinodes = (MAP: string[][]) => {
  let count = 0;
  MAP.forEach(line => {
    line.forEach(cell => {
      if (cell === '#') {
        count++;
      }
    });
  });
  return count;
};

for (const ANTENNA of ANTENNAS) {
  const antennas = findAllAntennas(ANTENNA, MAP);
  for (const antenna of antennas) {
    const otherAntennas = findAllAntennas(ANTENNA, MAP).filter(a => a.x !== antenna.x && a.y !== antenna.y);

    otherAntennas.forEach(otherAntenna => {
      const distance = calcDistance(antenna.x, antenna.y, otherAntenna.x, otherAntenna.y);
      const x = otherAntenna.x + distance.x;
      const y = otherAntenna.y + distance.y;

      if (MAP[y]?.[x] !== undefined) {
        MAP_COPY[y][x] = '#';
      }
    });
  }
}

console.log(MAP_COPY.map(line => line.join('')).join('\n'));

console.log(countAntinodes(MAP_COPY));
