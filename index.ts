// import { aoc01 } from './src/aoc01/main';
// import { aoc02 } from './src/aoc02/main';
// import { aoc03 } from './src/aoc03/main';
import { aoc04 } from './src/aoc04/main';

console.time('execution_complete');


console.log('######## AOC 04 ######################');
console.time('execution_part1');
console.log('PART1: ' + aoc04(false));
console.timeEnd('execution_part1');
console.time('execution_part2');
console.log('PART2: ' + aoc04());
console.timeEnd('execution_part2');

// console.log('######## AOC 03 ######################');
// console.time('execution_part1');
// console.log('PART1: ' + aoc03([[3, 1]]));
// console.timeEnd('execution_part1');
// console.time('execution_part2');
// console.log('PART2: ' + aoc03([[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]));
// console.timeEnd('execution_part2');

// console.log('######## AOC 02 ######################');
// console.time('execution_part1');
// console.log('PART1: ' + aoc02(false));
// console.timeEnd('execution_part1');
// console.time('execution_part2');
// console.log('PART2: ' + aoc02());
// console.timeEnd('execution_part2');

// console.log('######## AOC 01 ######################');
// console.time('execution_part1');
// console.log('PART1: ' + aoc01(2));
// console.timeEnd('execution_part1');
// console.time('execution_part2');
// console.log('PART2: ' + aoc01(3));
// console.timeEnd('execution_part2');

console.timeEnd('execution_complete');
