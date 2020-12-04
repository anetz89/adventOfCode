import  { readStringBlock } from '../shared/importer';

const validNorthPole = /()/;

export function aoc04 (enableValueCheck = true): number {
    const list: string[] = readStringBlock('./assets/aoc04.txt');

    return list.filter(passport => isValidPassport(passport, enableValueCheck)).length;
}

function isValidPassport(passport: string, enableValueCheck: boolean): boolean {
     const entries = passport.split(/( |\n)/g);

     return entries.filter(entry => {
        const entryVals = entry.split(':');
        switch(entryVals[0]) {
            case 'byr': return enableValueCheck? /^(19[2-9][0-9]|200[0-2])$/.test(entryVals[1]) : true;
            case 'iyr': return enableValueCheck? /^(201[0-9]|2020)$/.test(entryVals[1]) : true;
            case 'eyr': return enableValueCheck? /^(202[0-9]|2030)$/.test(entryVals[1]) : true;
            case 'hgt': return enableValueCheck? /^(1[5-8][0-9]cm|19[0-3]cm|59in|6[0-9]in|7[0-6]in)$/.test(entryVals[1]) : true;
            case 'hcl': return enableValueCheck? /^#[a-f0-9]{6}$/.test(entryVals[1]) : true;
            case 'ecl': return enableValueCheck? /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(entryVals[1]) : true;
            case 'pid': return enableValueCheck? /^0*\d{9}$/.test(entryVals[1]) : true;
            default: return false;
        }
     }).length === 7;  // warning! only works without duplicate entries
}
