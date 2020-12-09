import  { readNumberList } from '../shared/importer';
import { findMatch } from '../aoc01/main';

export function aoc09 (returnInvalidNumberOnly = false): number {
    const list: number[] = readNumberList('./assets/aoc09.txt');

    const invalidNumber = list.find(isInvalidNumber) || -1;

    if (returnInvalidNumberOnly || invalidNumber === -1) {
        return invalidNumber;
    }

    const result = findContiguousMatchList(list.slice(0, list.indexOf(invalidNumber)), invalidNumber);

    return Math.min(...result) + Math.max(...result);
}

function isInvalidNumber(elem: number , idx: number, completeList: number[]): boolean {
    const PREV_NUMBER_COUNT = 25;

    if (idx < PREV_NUMBER_COUNT) {
        return false;
    }
    return !findMatch(completeList.slice(idx - PREV_NUMBER_COUNT, idx), 2, elem, []);
}

function findContiguousMatchList(list: number[], targetNumber: number): number[] {
    for (let i = 0, l = list.length; i < l; i += 1) {
        const endIdx = getContiguousSum(list, i, targetNumber);

        if (endIdx) {
            return list.slice(i, endIdx + 1);
        }
    }
    return [];
}

function getContiguousSum(list: number[], startIdx: number, targetNumber: number): number {
    let sum = list[startIdx];
    let endIdx = startIdx;

    while(sum < targetNumber) {
        sum += list[++endIdx];
    }

    return (sum === targetNumber) ? endIdx : 0;
}
