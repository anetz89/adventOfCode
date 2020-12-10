import  { readNumberList } from '../shared/importer';

export function aoc10 (returnLongestJolt = false): number {
    const revList: number[] = readNumberList('./assets/aoc10.txt').sort((a, b) => b - a);

    revList.push(0);  // outlet
    revList.unshift(Math.max(...revList) + 3);  // device

    if (returnLongestJolt) {
        return getLongestChain(revList);
    }

    return countOptions(revList);
}

function getLongestChain(revList: number[]): any {
    let jolt1 = 0;
    let jolt3 = 0;

    revList.slice(0, revList.length - 1).forEach((jolt, idx) => {
        switch(jolt - revList[idx + 1]) {
            case 1: return jolt1 += 1;
            case 3: return jolt3 += 1;
            default: return;
        }
    });

    return jolt1 * jolt3;
}

function countOptions(revList: number[]): number {
    const resultList: number[] = [];

    const optionList = revList.forEach((elem: number, idx: number) => {
        let sum = (idx === 0) ? 1 : 0;

        sum += (idx > 2 && revList[idx - 3] - elem <= 3) ? resultList[idx - 3] : 0;
        sum += (idx > 1 && revList[idx - 2] - elem <= 3) ? resultList[idx - 2] : 0;
        sum += (idx > 0 && revList[idx - 1] - elem <= 3) ? resultList[idx - 1] : 0;

        resultList.push(sum);
    });

    return resultList[resultList.length - 1];
}
