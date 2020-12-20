import  { readStringBlock } from '../shared/importer';

export function aoc20 (part1 = false): any {
    const list: any[] = readStringBlock('./assets/aoc20.txt').map(parseTile);

    return list.filter(isCorner).map(a => a.id).reduce((a, b) => a * b);
}

function parseTile(input: string): any {
    const tile = input.split(/\r?\n/);
    return {
        borders: getBorders(tile.slice(1)),
        id: parseInt(tile[0].replace('Tile ', '').replace(':', '').trim(), 10)
    };
}

function getBorders(input: string[]): string[] {
    return [input[0], input.map(row => row[row.length - 1]).join(''), input[input.length - 1], input.map(row => row[0]).join('')]
}

function getBorderConnection(border: string, tile: any, list: any[]): number {
    const reverseBorder = border.split('').reverse().join('');

    return list.find(t => t.id !== tile.id && t.borders.find((tb: string) => tb === border || tb === reverseBorder));
}

function isCorner(tile: any, idx: number, list: any[]): boolean {
    return tile.borders.filter((border: string) => getBorderConnection(border, tile, list)).length === 2;
}
