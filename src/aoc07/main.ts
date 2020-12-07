import  { read, readStringList } from '../shared/importer';


export function aoc07(findBags = false): any {
    const input = read('./assets/aoc07.txt');

    if (findBags) {
        return findContainingBags(input.split(/\r?\n/).map(rule => rule.split(' bags contain ')), 'shiny gold', new Set()).size;
    }
    // return countBags(input.split(/\r?\n/).map(rule => rule.split(' bags contain ')), 'shiny gold') - 1;
    return eval(countBags(input.replace(/\n/g, ''), 'shiny gold')) - 1;
}

function findContainingBags(ruleList: string[][], bag: string, bags: Set<string>): Set<string> {
    for(let i = 0, l = ruleList.length; i < l; i += 1) {
        if(new RegExp(bag).test(ruleList[i][1])) {
            bags.add(ruleList[i][0]);
            bags = findContainingBags(ruleList, ruleList[i][0], bags);
        }
    }
    return bags;
}


// function countBags(ruleList: string[][], bag: string): number {
//     const rule = ruleList.find(rule => rule[0] === bag);

//     if (!rule) {
//         return 1;
//     }

//     const bags = rule[1].split(/ bags?, /);

//     let count = 1;

//     for (let i = 0, l = bags.length; i < l; i += 1) {
//         const amount = parseInt(bags[i].split(' ')[0], 10);

//         if (amount) {
//             count += amount * countBags(ruleList, bags[i].split(' ')[1] + ' ' + bags[i].split(' ')[2]);
//         }
//     }
//     return count;
// }

function countBags(input: string, bagName: string): string {
    const content = getBagContent(input, bagName);

    if (content === 'no other') {
        return '1';
    }

    return '1+' + content.split(',').map((b: string) => {
        const elements = b.trim().split(' ');

        return `${elements[0]}*(${ countBags(input, elements[1] + ' ' + elements[2])})`;
    }).join('+');
}

// returns content like "3 striped silver, 2 dark tan" or "no other bags"
function getBagContent(input: string, bagName: string): any {
    const firstPart = input.replace(new RegExp('^.*' + bagName + ' bags contain '), '');

    return firstPart.substring(0, firstPart.indexOf('.')).replace(/\sbags?/g, '');
}
