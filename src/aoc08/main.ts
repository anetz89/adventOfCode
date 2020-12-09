import  { readStringList } from '../shared/importer';

export function aoc08 (doNotAllowCodeChange = false): number {
    const list: string[][] = readStringList('./assets/aoc08.txt').map(codeLine => codeLine.split(' '));

    if (doNotAllowCodeChange) {
        return execute(list, false);
    }
    return excecuteTolerant(list);
}

function excecuteTolerant(input: string[][]): number {
    for(let i = 0, l = input.length; i < l; i += 1) {
        if (input[i][0] === 'jmp' || input[i][0] === 'nop') {
            input[i][0] = (input[i][0] === 'jmp') ? 'nop': 'jmp';

            const result = execute(input);
            if (result >= 0) {
                return result;
            }
            input[i][0] = (input[i][0] === 'jmp') ? 'nop': 'jmp';
        }
    }
    return -1;
}

function execute(input: string[][], expectRunThrough = true): number {
    let acc = 0;
    let index = 0;
    const list = [];

    while (list.indexOf(index) < 0 && index < input.length) {
        if (index < 0) {
            return -1;
        }

        list.push(index);

        switch(input[index][0]) {
            case 'acc': acc += parseInt(input[index][1], 10); index += 1; break;
            case 'jmp': index += parseInt(input[index][1], 10); break;
            default: index += 1;
        }
    }

    return (!expectRunThrough || list.indexOf(index) < 0) ? acc : -1;
}
