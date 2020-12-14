import  { readStringList } from '../shared/importer';

export function aoc13 (): number {
    const list: string[] = readStringList('./assets/aoc13.txt');

    return getEarliestBus(parseInt(list[0], 10), list[1].split(',').filter(bus => bus !== 'x').map(Number));

    // heap breaking part2, did not remind of Chinese remainder -.-
    // return getTimestampChain(list[1].split(',').filter(bus => bus !== 'x').map(Number));
}

function getEarliestBus(startTime: number, busList: number[]): number {
    let time = startTime;

    while(time < 2 * startTime) {
        const result = busList.find(bus => time % bus === 0);

        if (result) {
            return (time - startTime) * result;
        }
        time += 1;
    }
    return startTime * busList[0];
}

// function getTimestampChain(busList: number[]): number {
//     let timeToCheck = busList[0] * 1000000000000;
//     let time = 0;
//     let i = 0;
//     let l = busList.length;

//     while ('heapbreaker' === 'heapbreaker') {
//         i = 0;

//         for(;i < l; i += 1) {
//             if (busList[i] !== -1 && (timeToCheck + i) % busList[i] !== 0) {
//                 break;
//             } else if (i === l - 1) {
//                 return timeToCheck;
//             }
//         }
//         timeToCheck += busList[0];
//     }
//     return -1;
// }
