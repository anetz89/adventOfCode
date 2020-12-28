import  { read } from '../shared/importer';

export function aoc23 (part1 = false): any {
    const cupCircle: number[][] = read('./assets/aoc23.txt').split('')
                                    .map((elem, idx, list) => [Number(elem), (idx + 1) % list.length]);

    if (part1) {
        return buildChain(play2(cupCircle, 100)).join('');
    }

    let i = cupCircle.length;
    cupCircle[i - 1][1] = i;

    while(i++ < 1000000) {
        cupCircle.push([i, i % 1000000]);
    }

    return buildChain(play2(cupCircle, 10000000), 2).reduce((a, b) => a * b);
}

function buildChain(cupCircle: number[][], length?: number): number[] {
    let i = 0;
    let chain: number[] = [];
    let idx = (cupCircle.find(cup => cup[0] === 1) || [-1, -1])[1];
    length = length || cupCircle.length - 1;

    while (i < length) {
        const curr = cupCircle[idx];
        chain.push(curr[0]);
        idx = curr[1];
        i += 1;
    }

    return chain;
}

function play2(cupCircle: number[][], i: number): number[][] {
    let currIdx = 0;

    while (i > 0) {
        cupCircle = movePointer(cupCircle, currIdx);
        currIdx = cupCircle[currIdx][1];

        i -= 1;
    }

    return cupCircle;
}

function getIndex(cupCircle: number[][], currIdx: number) {
    for(let i = 0; i < 3; i += 1) {
        currIdx = cupCircle[currIdx][1]
    }
    return currIdx;
}

function getNextIndex(cupCircle: number[][], currVal: number, removedCups: number[] = []): number {
    let invalid = removedCups.find(cup => cup === currVal);

    while (invalid && currVal > 0) {
        currVal -= 1;
        invalid = removedCups.find(cup => cup === currVal);
    }

    if (currVal <= 0) {
        currVal = cupCircle.length;
        invalid = removedCups.find(cup => cup === currVal);
    }
    while (invalid && currVal > 0) {
        currVal -= 1;
        invalid = removedCups.find(cup => cup === currVal)
    }

    if (currVal < 10) {
        return cupCircle.findIndex(cup => cup[0] === currVal);
    }
    return currVal - 1;
}

function getRemovedCups(cupCircle: number[][], firstRemovedIdx: number): number[] {
    const secondRemovedIdx = cupCircle[firstRemovedIdx][1];
    const thirdRemovedIdx = cupCircle[secondRemovedIdx][1];

    return [cupCircle[firstRemovedIdx][0],
            cupCircle[secondRemovedIdx][0],
            cupCircle[thirdRemovedIdx][0]];
}

function movePointer(cupCircle: number[][], startIdx: number): number[][] {
    const remStartIdx = cupCircle[startIdx][1];
    const remEndIdx = getIndex(cupCircle, startIdx);
    const removedCups = getRemovedCups(cupCircle, remStartIdx);
    const goalIdx = getNextIndex(cupCircle, cupCircle[startIdx][0] - 1, removedCups);

    cupCircle[startIdx][1] = cupCircle[remEndIdx][1];
    cupCircle[remEndIdx][1] = cupCircle[goalIdx][1];
    cupCircle[goalIdx][1] = remStartIdx;

    return cupCircle;
}

