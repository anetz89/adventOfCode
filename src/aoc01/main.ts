import  { readNumberList } from '../shared/importer';

export function aoc01(amountOfNumbers: number): any {
    const list: number[] = readNumberList('./assets/aoc01.txt');

    const result: number[] = [];

    // sets result
    findMatch(list, amountOfNumbers, result);

    if (result.length !== amountOfNumbers) {
        return 'no values matche the criteria';
    }

    console.log('match values: ' + result.join(', '));

    return result.reduce((a, b) => a * b);
}

function findMatch(list: number[], maxDepth: number, result: number[], potentialResult: number[] = []): boolean {
    const matchElem = list.find((potentialElem, elemIndex) => {
        const sum = getSum(potentialResult, potentialElem);

        if (maxDepth === 1) {
            // maxDepth reached, check if match
            return sum === 2020;
        }
        // maxDepth not reached, search for next candiate if not > 2020
        if (sum <= 2020) {
            return findMatch(list, maxDepth - 1, result, [...potentialResult, potentialElem]);
        }

        // > 2020
        return false;
    });

    // collect result
    if (matchElem) {
        result.push(matchElem);
        return true;
    }

    return false;
}

function getSum(potentialResult: number[], checkElem: number): number {
    if (potentialResult.length) {
        return potentialResult.reduce((a, b) => a + b) + checkElem;
    }
    return checkElem;
}

