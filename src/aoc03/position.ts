export class Position {
    x: number;
    y: number;
    isTree: boolean;
    treeValue: string;

    constructor(x: number, y:number, value: string) {
        this.x = x;
        this.y = y;
        this.treeValue = value;
        this.isTree = value === '#';
    }
}
