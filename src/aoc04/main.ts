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
        let regex;

        switch(entryVals[0]) {
            case 'byr': regex = /^(19[2-9][0-9]|200[0-2])$/;        break;
            case 'iyr': regex = /^(201[0-9]|2020)$/;                break;
            case 'eyr': regex = /^(202[0-9]|2030)$/;                break;
            case 'hgt': regex = /^(1[5-8][0-9]cm|19[0-3]cm|59in|6[0-9]in|7[0-6]in)$/; break;
            case 'hcl': regex = /^#[a-f0-9]{6}$/;                   break;
            case 'ecl': regex = /^(amb|blu|brn|gry|grn|hzl|oth)$/;  break;
            case 'pid': regex = /^0*\d{9}$/;                        break;
            default: return false;
        }
        return enableValueCheck ? regex.test(entryVals[1]) : true;
     }).length === 7;  // warning! only works without duplicate entries
}
