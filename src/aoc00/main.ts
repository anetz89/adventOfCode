import  { readStringList } from '../shared/importer';

export function aoc02 (): string {
    const list: string[] = readStringList('./assets/aoc02.txt');
    return list[0];
}
