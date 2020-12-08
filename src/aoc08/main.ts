import  { readStringList } from '../shared/importer';

export function aoc08 (doNotAllowCodeChange = false): number {
    const list: string[] = readStringList('./assets/aoc08.txt');
    // return execute(list);
    if (doNotAllowCodeChange) {
        return execute(list, -1);
    }

    for(let i = 0, l = list.length; i < l; i += 1) {
        const result = execute(list, i);
        if (result >= 0) {
            return result;
        }
    }

    return -1;
}

function execute(input: string[], switchIndex: number): number {
    let acc = 0;
    let index = 0;
    const list = [];

    while (list.indexOf(index) < 0) {
        if (index < 0) {
            return -1;
        } else if (index >= input.length - 1) {
            return acc;
        }

        list.push(index);
        const command = input[index].split(' ');

        if (index === switchIndex) {
            if (command[0] === 'jmp') {
                command[0] = 'nop';
            } else if (command[0] === 'nop') {
                command[0] = 'jmp';
            } else {
                return -1;
            }
        }

        switch(command[0]) {
            case 'acc': acc += parseInt(command[1], 10); index += 1; break;
            case 'jmp': index += parseInt(command[1], 10); break;
            default: index += 1;
        }
    }

    return acc;
}
