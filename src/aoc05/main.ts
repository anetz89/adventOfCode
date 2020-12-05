import  { readStringList } from '../shared/importer';

export function aoc05 (getHighestTicketId = false): any {
    const list: string[] = readStringList('./assets/aoc05.txt');
    const plane = list.map(ticket => parseInt(ticket.replace(/(B|R)/g, '1').replace(/(F|L)/g, '0'), 2));

    if (getHighestTicketId) {
        return Math.max(...plane);
    }

    return findMissingSeat(plane);
}

function findMissingSeat(plane: number[]): any {
    return plane.sort((a, b) => a - b).filter((place, index) => {
        return place + 1 !== plane[index + 1];
    })[0] + 1;
}
