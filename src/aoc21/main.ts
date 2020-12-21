import  { readStringList } from '../shared/importer';

export function aoc21 (part1 = false): any {
    const parsed = parse(readStringList('./assets/aoc21.txt'));

    return (part1) ? reduce(parsed) : findDangerous(parsed.allergenes);
}

function parse(list: string[]): any {
    const ingOccur: any = {};
    const allList: any = {};

    list.forEach(elem => {
        const parts = elem.split(' (contains ');
        const ings = parts[0].split(' ');

        ings.forEach(ing => {
            if (!ingOccur.hasOwnProperty(ing)) {
                ingOccur[ing] = 0;
            }
            ingOccur[ing] += 1;
        });

        parts[1]
            .substring(0, parts[1].length - 1).split(' ')
            .forEach(all => {
                all = all.replace(',', '');
                // add set intersection or all ingredients if new allergene
                allList[all] = new Set(ings.filter(i => !allList.hasOwnProperty(all) || allList[all].has(i)));
            });
    });
    return {
        allergenes: allList,
        ingredients: ingOccur
    };
}

function reduce(parsed: any): number {
    return Object.keys(parsed.ingredients).filter(ing => {
        for (let all in parsed.allergenes) {
            if (parsed.allergenes[all].has(ing)) {
                return false;
            }
        }

        return true;
    }).map(key => parsed.ingredients[key]).reduce((a, b) => a + b);
}

function findDangerous(allergenes: any): string {
    const map: any = {};

    while (Object.keys(map).length < Object.keys(allergenes).length) {
        const match = Object.keys(allergenes).find(key => allergenes[key].size === 1);

        if (match) {
            const ing = allergenes[match].keys().next().value;

            map[ing] = match;

            Object.keys(allergenes).forEach(key => allergenes[key].delete(ing));
        }
    }

    return Object.keys(map).sort((a, b) => map[a] < map[b] ? -1 : 1).join(',');
}
