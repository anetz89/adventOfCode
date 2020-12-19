import  { readStringList } from '../shared/importer';

export function aoc18 (rulePart1 = false): number {
    const list: string[] = readStringList('./assets/aoc18.txt');

    return list.map(rulePart1 ? solve1 : solve2).reduce((a, b) => a + b);
}

function solve1(equation: string): number {
    equation = removeBrackets(equation, solve1);

    const parts = equation.split(' ');

    if (parts.length < 3) {
        return parseInt(equation, 10);
    }

    // tslint:disable-next-line
    return solve1(eval(parseInt(parts[0], 10) + parts[1] + solve1(parts[2])) + ' ' + parts.slice(3).join(' '));
}

function solve2(equation: string): number {
    equation = removeBrackets(equation.trim(), solve2);

    const parts = equation.split(' ');

    if (parts.length < 3) {
        return parseInt(equation, 10);
    }

    const index = getCalcIndex(parts);

    // tslint:disable-next-line
    return solve2(parts.slice(0, index - 1).join(' ') + ' ' + eval(parseInt(parts[index - 1], 10) + parts[index] + solve2(parts[index + 1])) + ' ' + parts.slice(index + 2).join(' '));
}

function getCalcIndex(parts: string[]): number {
    let index = parts.indexOf('+');

    if (index < 0) {
        index = parts.indexOf('*');
    }
    if (index < 0) {
        index = parts.length - 1;
    }
    return index;
}

function removeBrackets(equation: string, solveFunc: (s: string) => number): string {
    let bracketIndex = equation.indexOf('(');

    while(bracketIndex >= 0) {
        const bracketpart = getBracketPart(equation.substring(bracketIndex + 1));
        equation = equation.replace('(' + bracketpart + ')', '' + solveFunc(bracketpart));

        bracketIndex = equation.indexOf('(');
    }

    return equation;
}

function getBracketPart(eq: string): string {
    let openingBrackets = 1;

    for (let i = 0; i < eq.length; i += 1) {
        openingBrackets += (eq[i] === '(') ? 1 : ((eq[i] === ')') ? -1 : 0);
        if (openingBrackets <= 0) {
            return eq.substring(0, i);
        }
    }

    return eq;
}
