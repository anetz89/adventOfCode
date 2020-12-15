import  { read } from '../shared/importer';

export function aoc15 (index: number): string {
    const list: number[] = read('./assets/aoc15.txt').split(',').map(Number);

    return getNumberOfPosition(list, index);
}

function getNumberOfPosition(list: number[], position: number): string {
    const numbers: number[] = [];
    let prevNumber = list[list.length - 1];

    list.forEach((elem: number, idx: number) => numbers[elem] = idx);

    for (let i = list.length; i < position; i += 1) {
        const successor = numbers[prevNumber];

        numbers[prevNumber] = i - 1;

        prevNumber = (successor || successor === 0) ? i - 1 - successor : 0 ;
    }
    return '' + prevNumber;
}
