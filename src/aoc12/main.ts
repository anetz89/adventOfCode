import  { readStringList } from '../shared/importer';

export function aoc12(useWaypointMovement = true): any {
    const list: any[][] = readStringList('./assets/aoc12.txt').map(elem => [elem[0], parseInt(elem.slice(1), 10)]);

    // waypointMove(list);
    if (useWaypointMovement) {
        return waypointMove(list);
    }
    return move(list, 'E');
}

function move(list: any[][], direction: string): number {
    const dirList = ['N', 'E', 'S', 'W'];
    let north = 0;
    let east = 0;

    list.forEach(dir => {
        switch(dir[0] === 'F' ? direction: dir[0]) {
            case 'N': north += dir[1]; return;
            case 'E': east += dir[1]; return;
            case 'S': north -= dir[1]; return;
            case 'W': east -= dir[1]; return;
            case 'R': direction = dirList[(dirList.indexOf(direction) + 4 + dir[1] / 90) % 4]; return;
            case 'L': direction = dirList[(dirList.indexOf(direction) + 4 - dir[1] / 90) % 4]; return;
            default: return;
        }
    });

    return Math.abs(east) + Math.abs(north);
}


function waypointMove(list: any[][]): number {
    let north = 0;
    let east = 0;

    let waypointNorth = 1;
    let waypointEast = 10;

    let tmp;
    let dirAmount;

    list.forEach(dir => {
        switch(dir[0]) {
            case 'N': waypointNorth += dir[1]; return;
            case 'E': waypointEast += dir[1]; return;
            case 'S': waypointNorth -= dir[1]; return;
            case 'W': waypointEast -= dir[1]; return;
            case 'F':
                north += dir[1] * waypointNorth;
                east += dir[1] * waypointEast;
                return;
            case 'R':
                dirAmount = dir[1] / 90;

                while(dirAmount > 0) {
                    tmp = waypointEast;
                    waypointEast = waypointNorth;
                    waypointNorth = -1 * tmp;

                    dirAmount -= 1;
                }
                return;
            case 'L':
                dirAmount = dir[1] / 90;

                while(dirAmount > 0) {
                    tmp = waypointEast;
                    waypointEast = -1 * waypointNorth;
                    waypointNorth = tmp;

                    dirAmount -= 1;
                }
                return;
            default: return;
        }
    });

    return Math.abs(east) + Math.abs(north);
}
