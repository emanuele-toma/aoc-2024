import fs from 'fs';

const INPUT = fs.readFileSync('./07/input.advent_of_code.txt', 'utf-8');

const equations = INPUT.split('\n').map(line => {
  const test = Number(line.split(': ')[0]);
  const values = line.split(': ')[1].split(' ').map(Number);

  return { test, values };
});

const valid: number[] = [];

const getOperators = (sequence: number) => {
  const binary = sequence.toString(2).split('').map(Number).slice(1);
  const operators = binary.map(value => (value === 1 ? '+' : '*'));
  return operators;
};

const checkTest = ({ test, values }: { test: number; values: number[] }) => {
  let sequence = 2 ** (values.length - 1);
  const limit = 2 ** values.length - 1;

  while (sequence <= limit) {
    const operators = getOperators(sequence);
    let result = values[0];
    for (let i = 0; i < operators.length; i++) {
      if (operators[i] === '+') {
        result += values[i + 1];
      } else {
        result *= values[i + 1];
      }
    }

    if (result === test) {
      valid.push(test);
      return true;
    }

    sequence++;
  }
  return false;
};

for (const equation of equations) {
  checkTest(equation);
}

console.log(valid.reduce((acc, value) => acc + value, 0));
