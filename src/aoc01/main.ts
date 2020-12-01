import  { readNumberList } from '../shared/importer';

export function aoc1 (numberCount: number): any {
	const list: number[] = readNumberList('./assets/aoc01/input.txt');

	let result = findMatch1(list, numberCount);

	if (result.length !== numberCount) {
		return 'no values matche the criteria';
	}

	console.log('match values: ' + result.join(', '));

	return result.reduce((a, b) => a * b);
}

export function aoc2(numberCount: number) {
	const list: number[] = readNumberList('./assets/aoc01/input.txt');

	let result = findMatch2(list, numberCount);

	if (result.length !== numberCount) {
		return 'no values matche the criteria';
	}

	console.log('match values: ' + result.join(', '));

	return result.reduce((a, b) => a * b);
}

function findMatch1(list: number[], maxDepth: number, value: number[] = []): number[] {
	let result: number[] = [];

	list
		.find((elem) => {
			const matchElem = list.find((checkElem) => elem + checkElem === 2020);
			if(matchElem) {
				result = [matchElem, elem];
				return true;
			}
		});

	return result;
}

function findMatch2(list: number[], maxDepth: number, value: number[] = []): number[] {
	let result: number[] = [];

	list
		.find((elem) => {
			const matchElem = list.find((checkElem) => {
				const matchElemFinal = list.find((checkElemFinal) => {
					return elem + checkElem + checkElemFinal === 2020
				});
				if(matchElemFinal) {
					result = [matchElemFinal, elem];
					return true;
				}
			});
			if(matchElem) {
				result.push(matchElem);
				return true;
			}
		});

	return result;
}

function findMatch(list: number[], maxDepth: number, value: number[] = []): number[] {
/*	if (maxDepth < 2) {
		if (value.reduce((a, b) => a + b) === 2020) {
			return value;
		}
		return [];
	}

	// starte beim ersten element 
	const newValue: number[] = JSON.parse(JSON.stringify(value));
	newValue.push(list[0]);

	const newList = list.slice(1);



	// prüfe gegen restliche liste
	for (let i = 0; i < newList.length; i += 1) {

		// bilde summe mit neuem Wert
		const check = newValue.reduce((a, b) => a + b) + newList[i];

		// passt summe und ist nötige tiefe erreicht -> ERFOLG!
		if (maxDepth === 2 && check === 2020) {
			newValue.push(list[i]);
			return newValue;
		}
		// summe kleiner, aber noch tiefe vorhanden -> weitersuchen mit aktuellem wert
		if (maxDepth > 2 && check < 2020) {
			return findMatch(newList.splice(i, 1), maxDepth - 1, newValue);
		}
	}

	// falls kein Treffer, versuche es mit der minimierten liste
	return findMatch(newList, maxDepth, value); 
	*/
	return [];
}
