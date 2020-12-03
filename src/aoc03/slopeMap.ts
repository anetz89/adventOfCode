import { Position } from './position';

export class SlopeMap {
    pattern: Position[][];
    sizeX: number;
    sizeY: number;

    constructor(input: string[][]) {
        this.pattern = input.map((column, colIndex) =>
            column.map((cell, rowIndex) => new Position(rowIndex, colIndex, cell))
        );
        this.sizeX = input[0].length;
        this.sizeY = input.length;
    }

    getPosition(x: number, y: number): Position {
        const position = this.pattern[y][x % this.sizeX];

        return new Position(x, y, position.treeValue);
    }

    slide(from: Position, right: number, down: number): Position {
        const x = from.x + right;
        const y = from.y + down;

        return this.getPosition(x, y);
    }
}
