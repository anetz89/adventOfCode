import  { readStringList } from '../shared/importer';

export function aoc14 (useVersion2 = true): number {
    const list: string[] = readStringList('./assets/aoc14.txt');

    return initialize(list, useVersion2);
}

function initialize(list: string[], useVersion2: boolean): number {
    const result: number[] = [];
    const indexSet: Set<number> = new Set();  // added for performance reasons
    let mask: string;

    list.forEach((entry: string) => {
        if (entry.indexOf('mask') >= 0) {
            return mask = entry.replace('mask = ', '');
        }

        if (useVersion2) {
            const indexVal = applyMaskToIndex(mask, getMemIdx(entry).toString(2));
            const memVal = getMemVal(entry);

            return getIndexOptions(indexVal).forEach(opt => {
                result[opt] = memVal;
                indexSet.add(opt);
            });
        }
        // Version 1
        const index = getMemIdx(entry);
        result[index] = parseInt(applyMaskToValue(mask, getMemVal(entry).toString(2)), 2);
        indexSet.add(index)
    });

    let resultVal = 0;

    indexSet.forEach((b: number) => resultVal += result[b]);

    return resultVal;
}


function initializeV1(list: string[]): number {
    const result: number[] = [];
    let mask: string;

    list.forEach((entry: string) => {
        if (entry.indexOf('mask') >= 0) {
            mask = entry.replace('mask = ', '');
        } else {
            result[getMemIdx(entry)] = parseInt(applyMaskToValue(mask, getMemVal(entry).toString(2)), 2);
        }
    });

    return result.filter(a => a).reduce((a, b) => a + b);
}

function applyMaskToValue(mask: string, memVal: string): string {
    let resultString = '';

    for (let i = mask.length - 1, j = memVal.length - 1; i >= 0; i -= 1, j -= 1) {
        if (mask[i] === 'X' && j >= 0) {
            resultString = memVal[j] + resultString;
        } else {
            resultString = (((mask[i] === '1') ? '1' : '0') + resultString);
        }
    }

    return resultString;
}

function applyMaskToIndex(mask: string, memIdx: string): string {
    let resultString = '';

    for (let i = mask.length - 1, j = memIdx.length - 1; i >= 0; i -= 1, j -= 1) {
        if (mask[i] === '0') {
            if (j >= 0) {
                resultString = memIdx[j] + resultString;
            } else {
                resultString = '0' + resultString;
            }
        } else {
            resultString = mask[i] + resultString;
        }
    }

    return resultString;
}


function getMemIdx(instr: string): number {
    return parseInt(instr.substr(instr.indexOf('[') + 1, instr.indexOf(']')), 10);
}
function getMemVal(instr: string): number {
    return parseInt(instr.split('=')[1].trim(), 10);
}
function getIndexOptions(maskedIndex: string): number[] {
    return (maskedIndex.indexOf('X') < 0) ? [parseInt(maskedIndex, 2)] : [...getIndexOptions(maskedIndex.replace('X', '0')),
                                                                          ...getIndexOptions(maskedIndex.replace('X', '1'))]
}
