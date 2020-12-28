import  { readNumberList } from '../shared/importer';

export function aoc25 (): number {
    const keys: number[] = readNumberList('./assets/aoc25.txt');

    return transform(keys[1], transform(keys[0]));
}

function transform(key: number, loopSize?: number, secret = 1): number {
    let i = 0;
    let inc = loopSize ? key : 7;

    while (loopSize? i < loopSize : secret !== key) {
        secret = (secret * inc) % 20201227;
        i += 1;
    }
    return loopSize? secret : i;
}
