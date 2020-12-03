import { read } from '../shared/importer';

export function aoc03 (slopes: number[][]): number {
    const pattern: string[] = read('./assets/aoc03.txt');

    return slopes.map((slope): number => getTreeCount(pattern, slope))
        .reduce((a: number, b: number) => a * b);
}

function getTreeCount(pattern: string[], slope: number[]) {
    let count = 0;
    let x = 0;

    for (let y = 0, sizeY = pattern.length - 1; y <= sizeY - slope[1]; ) {
        if (pattern[y += slope[1]].charAt((x += slope[0]) % pattern[y].length) === '#') {
            count += 1;
        }
    }

    return count;
}
