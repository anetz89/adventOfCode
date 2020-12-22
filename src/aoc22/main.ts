import  { readStringBlock } from '../shared/importer';

export function aoc22 (playBoring = false): any {
    const player: number[][] = readStringBlock('./assets/aoc22.txt').map(p => p.split(/\r?\n/).slice(1).map(Number));

    const gameResult = playRecursive(player[0], player[1], playBoring);
    const winningCards: number[] = (gameResult.winner === 1) ? gameResult.player1 : gameResult.player2;

    return winningCards.map((card, idx) => (winningCards.length - idx) * card)
                       .reduce((a, b) => a + b);
}

function playRecursive(player1: number[], player2: number[], playSimple: boolean, prevRoundHashes: string[] = []): any {
    if (!player1.length || !player2.length) {
        return {
            winner: player2.length ? 2 : 1,
            player1,
            player2
        };
    }

    const hash = player1.join(',') + '|' + player2.join(',');

    if (!playSimple && prevRoundHashes.indexOf(hash) >= 0) {
        return {
            winner: 1,
            player1: [],
            player2: []
        };
    }
    prevRoundHashes.push(hash);

    const card1 = player1.shift() || 0;
    const card2 = player2.shift() || 0;
    let player1won = false;

    if (!playSimple && player1.length >= card1 && player2.length >= card2) {
        player1won = playRecursive(player1.slice(0, card1), player2.slice(0, card2), playSimple).winner === 1;
    } else {
        player1won = card1 > card2;
    }

    if (player1won) {
        player1.push(card1);
        player1.push(card2);
    } else {
        player2.push(card2);
        player2.push(card1);
    }
    return playRecursive(player1, player2, playSimple, prevRoundHashes);
}
