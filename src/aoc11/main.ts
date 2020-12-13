import  { readStringList } from '../shared/importer';

export function aoc11 (part1 = false): number {
    let waitingArea: string[] = readStringList('./assets/aoc11.txt');
    let newSituation: string[]|null = null;
    let count = 0;

    do {
        count += 1;
        newSituation = iterate(waitingArea, part1 ? 4 : 5);
        if (newSituation) {
            waitingArea = newSituation;
        }
    } while (newSituation);

    return waitingArea.map(pos => (pos.match(/#/g) || []).length || 0).reduce((a, b) => a + b);
}


function iterate(waitingArea: string[], tolerance: number): string[]|null {
    let changes = 0;

    const newSituation = waitingArea.map((seatRow, y) => {
        let newSeatRow = seatRow;

        for(let x = 0; x < seatRow.length; x += 1) {
            const currSeat = seatRow[x];
            if (currSeat !== '.') {
                const newVal = getNewSeatVal(waitingArea, x, y, currSeat, tolerance);

                if (newVal && seatRow[x] !== newVal) {
                    // change seat status
                    newSeatRow = newSeatRow.substr(0, x) + newVal + newSeatRow.slice(x + 1);
                    changes += 1;
                }
            }
        }
        return newSeatRow;
    });

    return (changes) ? newSituation : null;
}

function getNewSeatVal(waitingArea: string[], x: number, y: number, oldSeat: string, tolerance: number): string {
    const seatCount = countSurSeats(waitingArea, x, y, tolerance === 5);

    if (oldSeat === '#' && seatCount >= tolerance) {
        return 'L';
    }
    if (oldSeat === 'L' && seatCount === 0) {
        return '#';
    }
    return '';
}

function countSurSeats(waitingArea: string[], xVal: number, yVal: number, continuousSearch: boolean) {
    return getSurSeatVal(waitingArea, xVal, yVal, (x: number) => x - 1, (y: number) => y - 1, continuousSearch) +
           getSurSeatVal(waitingArea, xVal, yVal, (x: number) => x - 1, (y: number) => y    , continuousSearch) +
           getSurSeatVal(waitingArea, xVal, yVal, (x: number) => x - 1, (y: number) => y + 1, continuousSearch) +
           getSurSeatVal(waitingArea, xVal, yVal, (x: number) => x    , (y: number) => y - 1, continuousSearch) +
           getSurSeatVal(waitingArea, xVal, yVal, (x: number) => x    , (y: number) => y + 1, continuousSearch) +
           getSurSeatVal(waitingArea, xVal, yVal, (x: number) => x + 1, (y: number) => y - 1, continuousSearch) +
           getSurSeatVal(waitingArea, xVal, yVal, (x: number) => x + 1, (y: number) => y    , continuousSearch) +
           getSurSeatVal(waitingArea, xVal, yVal, (x: number) => x + 1, (y: number) => y + 1, continuousSearch);
}

function getSurSeatVal(waitingArea: string[], x: number, y: number, xFunc: (x:number) => number, yFunc: (y:number) => number, continuousSearch: boolean): number {
    const newX = xFunc(x);
    const newY = yFunc(y);

    if (newX < 0 || newY < 0 || newY >= waitingArea.length || newX >= waitingArea[y].length) {
        // reached edge -> no seat occupied
        return 0;
    }

    const surSeat = waitingArea[newY][newX];

    if (continuousSearch && surSeat === '.') {
        return getSurSeatVal(waitingArea, newX, newY, xFunc, yFunc, continuousSearch);
    }
    return (surSeat === '#') ? 1 : 0;
}
