const fs = require('fs');


export function read(input: string): string[] {
	let data = '';

	try {
	    data = fs.readFileSync(input, 'UTF-8');
	} catch (err) {
	    console.error(err);
	}

	const result = data.split(/\r?\n/);

	// console.log('read in file with ' + result.length + ' elements')

	return result;
}

export function readNumberList(input: string): number[] {
	const list = read(input);

	if (!list) {
		console.error('no list available');
		return [];
	}

	return list.map(elem => parseInt(elem || '0'));
}