import  { readStringBlock } from '../shared/importer';

export function aoc19 (applyPart2Rules = true): number {
    const blocks: any[] = readStringBlock('./assets/aoc19.txt');
    const rule = new RegExp('^(' + getRule(blocks[0].split(/\r?\n/), 0, applyPart2Rules) + ')$');

    return blocks[1].split(/\r?\n/)
                    .filter((line: string) => rule.test(line))
                    .length;
}

function getRule(ruleList: string[], index: number, applyPart2Rules: boolean, infinitAccuracy = 3): string {
    if (applyPart2Rules) {
        if (index === 8) {
            return '((' + getRule(ruleList, 42, applyPart2Rules)  + ')+)'
        }
        if (index === 11) {
            const rule31 = getRule(ruleList, 31, applyPart2Rules);
            const rule42 = getRule(ruleList, 42, applyPart2Rules);

            if (infinitAccuracy < 0) {
                return '(' + rule42 + ')(' + rule31 + ')';
            }
            return '((' + rule42 + ')(' + rule31 + ')|('
                + rule42 + ')(' + getRule(ruleList, 11, applyPart2Rules, infinitAccuracy - 1) + ')(' + rule31 + '))';
        }
    }
    // standard rule resolution
    const rule = ruleList.find(r => r.indexOf(index + ':') === 0);

    return !rule ? '' : rule.substring(rule.indexOf(':') + 2).split(' ')
        .map(ruleElem => (/\d+/.test(ruleElem)) ? '(' + getRule(ruleList, parseInt(ruleElem, 10), applyPart2Rules) + ')' : ruleElem.replace(/"/g, ''))
        .join('');

}
