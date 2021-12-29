// Config:
const numberOfRecords = 50000;
// SuchDB.
const {
	Database,
	Query
} = require('../../index');
// Perfomance measure.
const { performance } = require('perf_hooks');


module.exports = _run();

async function _run() {
	try {
		const db = new Database('select_test');

		const table = db.createTable('transactions');

		_insertPseudoRecords(table);

		// Query:
		const startTime = performance.now();

		const results = await table.select(
											Query().where('name', '=', 'name_4000')
										);

		console.log(results);

		const endTime = performance.now();

		console.log(`Call to query 1 record from ${numberOfRecords} took ${endTime - startTime} milliseconds`);
	}
	catch(error) {
		console.error(error);
	}
	finally {
		return Promise.resolve();
	}
}

function _insertPseudoRecords(table) {
	const startTime = performance.now();

	// Insert X records:
	let i = 0;
	while(i < numberOfRecords) {
		const rowData = {
			buy: 3021.31,
			sell: 3021.31 + i,
			profit: i,
			name: `name_${i}`,
		}

		table.insert(rowData);

		i++;
	}

	const endTime = performance.now();

	console.log(`Call to insert ${numberOfRecords} took ${endTime - startTime} milliseconds`);
}
