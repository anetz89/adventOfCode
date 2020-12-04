import  { readStringList } from '../shared/importer';

export function aoc02 (useNewRule = true): number {
    const list: string[] = readStringList('./assets/aoc02.txt');

    return list.map((elem) => parsePasswordString(elem))
                .filter((pwElem: any) => useNewRule? validateNewRule(pwElem) : validateOldRule(pwElem))
                .length;
}


function validateNewRule(pwElem: any): boolean {
    let valid = true;

    pwElem.chars.forEach((char: string) => {
        if ((pwElem.password[pwElem.numVal1 - 1] === char && pwElem.password[pwElem.numVal2 - 1] === char) ||
            (pwElem.password[pwElem.numVal1 - 1] !== char && pwElem.password[pwElem.numVal2 - 1] !== char)) {
            valid = false;
        }
    });

    return valid;
}

function validateOldRule(pwElem: any): boolean {
    let valid = true;

    pwElem.chars.forEach((char: string) => {
        const count = countChar(char, pwElem.password);

        if (count < pwElem.numVal1 || count > pwElem.numVal2) {
            valid = false;
        }
    });

    return valid;
}

function countChar(char: string, input: string): number {
    return (input.match(new RegExp(char, 'g')) || []).length;
}

function parsePasswordString(input: string): any {
    // input looks like '1-3 a: abcde'
    const ruleSet = input.split(': ')[0].trim();
    const amountSet = ruleSet.split(' ')[0];

    return {
        numVal1: parseInt(amountSet.split('-')[0], 10),
        numVal2: parseInt(amountSet.split('-')[1], 10),
        chars: ruleSet.split(' ')[1].split(''),
        password: input.split(': ')[1].trim()
    };
}
