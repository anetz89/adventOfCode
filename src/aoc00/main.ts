import  { read } from '../shared/importer';

export function aoc02 (): string {
    const list: string[] = read('./assets/aoc02.txt');
    return list[0];
}
