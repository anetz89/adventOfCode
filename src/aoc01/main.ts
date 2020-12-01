import  { readNumberList } from '../shared/importer';


export function aoc1 (): any {
	const list: number[] = readNumberList('./assets/aoc01/input.txt');

	const checkElem = list.shift() || 0;
	let matchElem;	

	const matchValue = list
		.find((elem) => {
			matchElem = list.find((checkElem) => elem + checkElem === 2020);
			if(matchElem) {
				return true;
			}
		});

	if (!matchElem || !matchValue) {
		return 'no value matches the criteria';
	}

	console.log('matching pair: ' + matchElem + ' and ' + matchValue);

	return matchValue * matchElem;
}
