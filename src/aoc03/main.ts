import { read } from '../shared/importer';
import { Position } from './position';
import { SlopeMap } from './slopeMap';


export function aoc03 (slopes: number[][]): number {
    const list: string[] = read('./assets/aoc03.txt');
    const pattern: string[][] = list.map(col => col.split(''));

    const map = new SlopeMap(pattern);

    const slopeTreeCounts = slopes.map((slope): number => getTreeCount(map, slope));

    console.log(slopeTreeCounts);

    return slopeTreeCounts.reduce((a: number, b: number) => a * b);
}

function getTreeCount(map: SlopeMap, slope: number[]) {
    const positions: Position[] =  slide(map, map.getPosition(0, 0), slope);

    return positions.filter(position => position.isTree).length;
}

function slide(map: SlopeMap, position: Position, slope: number[], result: Position[] = []): Position[] {
    if (position.y >= map.sizeY - 1) {
        return result;
    }

    const newPosition = map.slide(position, slope[0], slope[1]);

    result.push(newPosition);

    return slide(map, newPosition, slope, result);
}
