import  { readStringBlock } from '../shared/importer';

export function aoc06 (countExplicit = false): number {
    return readStringBlock('./assets/aoc06.txt')
                .map(block => getSum(block, countExplicit))
                .reduce((a, b) => a + b);
}

function getSum(block: string, countExplicit: boolean) {
    const alphabet = [...'abcdefghijklmnopqrstuvwxyz'];
    const blocks = block.split('\n');

    return alphabet
        .filter(character => {
            if (countExplicit) {
                return block.indexOf(character) >= 0;
            }
            return blocks.filter(blockElem => blockElem.indexOf(character) >= 0)
                            .length === blocks.length;
        })
        .length;
}
