import  { readStringList } from '../shared/importer';

export function aoc17 (use4thDimension = true): number {
    const ITERATIONS = 6;
    const list: string[] = readStringList('./assets/aoc17.txt');

    return iterate(ITERATIONS, createCubes(list, ITERATIONS, use4thDimension));
}

function iterate(times: number, cubes: number[][][][]): number {
    if (times <= 0) {
        // count all active cubes after last iteration
        return flatDeep(cubes, 4).reduce((a: number, b: number) => a + b);
    }
    // next step with modified cubes
    return iterate(times - 1, cubes.map((w, wIdx) => {
        return w.map((z, zIdx) => {
            return z.map((y, yIdx) => {
                return y.map((x, xIdx) => {
                    return getCubeValue(cubes, xIdx, yIdx, zIdx, wIdx);
                });
            });
        });
    }));
}

function getCubeValue(cubes: number[][][][], xVal: number, yVal: number, zVal: number, wVal: number): number {
    let neighbourCount = 0;

    for(let w = wVal > 0 ? -1: 0, wTo = (wVal < cubes.length - 1) ? 2 : 1; w < wTo; w += 1) {
        for(let z = zVal > 0 ? -1: 0, zTo = (zVal < cubes[0].length - 1) ? 2: 1; z < zTo; z += 1) {
            for(let y = yVal > 0 ? -1: 0, yTo = (yVal < cubes[0].length - 1) ? 2: 1; y < yTo; y += 1) {
                for(let x = xVal > 0 ? -1: 0, xTo = (xVal < cubes[0].length - 1) ? 2: 1; x < xTo; x += 1) {
                    if (w || x || y || z) {  // do not count identity
                        neighbourCount += cubes[wVal + w][zVal + z][yVal + y][xVal + x];
                    }
                }
            }
        }
    }

    if (cubes[wVal][zVal][yVal][xVal]) {
        return (neighbourCount === 2 || neighbourCount === 3) ? 1 : 0;
    }
    return (neighbourCount === 3) ? 1 : 0;
}

function createCubes(list: string[], iterations: number, use4thDimension: boolean): number[][][][] {
    const maxSize = list.length + 2 * (iterations - 1);
    const startIndex = Math.floor(maxSize / 2) - Math.floor(list.length / 2);

    const cubes: number[][][][] = new Array(use4thDimension ? maxSize: 1).fill(new Array(maxSize).fill(new Array(maxSize).fill(new Array(maxSize).fill(0))));

    // deep copy values to assure no assignment by reference
    for(let i = 0; i < cubes.length; i += 1) {
        cubes[i] = JSON.parse(JSON.stringify(cubes[i]));
    }

    // fill cube with input
    list.forEach((yRow: string, idx: number) => {
        for (let xIdx = 0; xIdx < yRow.length; xIdx += 1) {
            cubes[use4thDimension? startIndex + Math.floor(list.length / 2) : 0][startIndex + Math.floor(list.length / 2)][startIndex + idx][startIndex + xIdx] =
                (yRow[xIdx] === '#') ? 1 : 0;
        }
    });

    return cubes;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
function flatDeep(arr: any[], d = 1): number[] {
   return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
                : arr.slice();
};
