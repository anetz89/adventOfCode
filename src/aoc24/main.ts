import  { readStringList } from '../shared/importer';

export function aoc24 (part2 = true): number {
    const tilePaths: string[][] = readStringList('./assets/aoc24.txt').map(path => getTilePath(/(e|se|sw|w|nw|ne)/g, path));
    let blackTiles = getBlackTiles(tilePaths);

    if (part2) {
        for (let i = 0; i < 100; i += 1) {
            blackTiles = flip(blackTiles);
        }
    }

    return blackTiles.size;
}

function getNeighbors(): Map<string, any> {
    return new Map<string, any>([
        ['e', { x: 1, y: -1, z: 0 }],
        ['w', { x: -1, y: 1, z: 0 }],
        ['se', { x: 0, y: -1, z: 1 }],
        ['nw', { x: 0, y: 1, z: -1 }],
        ['ne', { x: 1, y: 0, z: -1 }],
        ['sw', { x: -1, y: 0, z: 1 }]
    ]);
}

function flip(blackTiles: Set<string>): Set<string> {
    const result = new Set(blackTiles);
    const whiteTiles = getWhiteTiles(blackTiles);

    blackTiles.forEach(blackKey => {
        const count = getBlackNeighborCount(toPoint(blackKey), blackTiles);

        if (count === 0 || count > 2) {
            result.delete(blackKey);
        }
    });

    whiteTiles.forEach(whiteKey => {
        if (getBlackNeighborCount(toPoint(whiteKey), blackTiles) === 2) {
            result.add(whiteKey);
        }
    });

    return result;
}

function getBlackNeighborCount(point: any, blackTiles: Set<string>): number {
    let count = 0;

    getNeighbors().forEach(neighborVector => {
        if (blackTiles.has(toKey(add(point, neighborVector)))) {
            count += 1;
            if (count > 2) {
                return count;
            }
        }
    });

    return count;
}

function getWhiteTiles(blackTiles: Set<string>): Set<string> {
    const directionMap = getNeighbors();
    const whiteTiles = new Set<string>();

    blackTiles.forEach(blackKey => {
        const blackPoint = toPoint(blackKey);

        directionMap.forEach(neighborVector => {
            const neighborKey = toKey(add(blackPoint, neighborVector));

            if (!blackTiles.has(neighborKey)) {
                whiteTiles.add(neighborKey);
            }
        });
    });

    return whiteTiles;
}

function getTilePath(regex: RegExp, path: string): string[] {
    const result: string[] = [];

    let record: any;

    while (record = regex.exec(path)) {
        result.push(record[1]);
    }

    return result;
}

function getBlackTiles(tilePaths: string[][]): Set<string> {
    const directionMap = getNeighbors();
    const blackList = new Set<string>();

    tilePaths.forEach((path: string[]) => {
        let point = { x: 0, y: 0, z: 0 };

        path.forEach(direction => {
            point = add(point, directionMap.get(direction));
        });

        const key = point.x + ',' + point.y + ',' + point.z;

        (blackList.has(key)) ? blackList.delete(key) : blackList.add(key);
    });

    return blackList;
}

function toKey(p: any): string {
    return p.x + ',' + p.y + ',' + p.z;
}

function toPoint(key: string): any {
    const p = key.split(',').map(x => parseInt(x));
    return { x: p[0], y: p[1], z: p[2] };
}

function add(a: any, b: any): any {
    return { x: a.x + b.y, y: a.y + b.y, z: a.z + b.z };
}
