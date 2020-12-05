import  { readStringList } from '../shared/importer';

export function aoc05 (getHighestTicketId = false): any {
    const list: string[] = readStringList('./assets/aoc05.txt');
    const plane: number[] = [];
    let maxId = 0;

    list.map(ticket => ticket.replace(/(B|R)/g, '1').replace(/(F|L)/g, '0'))
        .map(ticket => {
            const row = parseInt(ticket.slice(0,7), 2);
            if (!plane[row]) {
                plane[row] = 0;
            }
            plane[row] += parseInt(ticket.slice(7), 2);

            // find highest ticket id
            const id = parseInt(ticket, 2);
            if (id > maxId) {
                maxId = id;
            }
        });

    if (getHighestTicketId) {
        return maxId;
    }

    return findMissingSeat(plane);
}

function findMissingSeat(plane: number[]): any {
    for(let i = 0; i < 128; i += 1) {
        if (plane[i] && plane[i - 1] && plane[i] < 28) {
            return (i * 8) + 28 - plane[i];
        }
    }

    return [0, 0];
}
