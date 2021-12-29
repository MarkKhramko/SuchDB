// Config:
const numberOfRecords = 500;
// SuchDB.
const { Database } = require('../../index');


module.exports = _run();

function _run() {
	const db = new Database('tests');

	db.createTable('transactions');

	let i = 0;
	while(i < numberOfRecords) {
		const rowData = {
			buy: 3021.31,
			sell: 3021.31 + i,
			profit: i,
		}

		db.insert('transactions', rowData);

		i++;
	}

	// Check table:
	const table = db.getTable('transactions');
	if (table.rows.length !== numberOfRecords) {
		throw new Error(`Table's number of rows is ${table.rows.length}, should be ${numberOfRecords}`);
	}

	if (table.rowsCount !== numberOfRecords) {
		throw new Error(`Table's rowsCount is ${table.rowsCount}, should be ${numberOfRecords}`);
	}

	if (table.realRowsCount !== numberOfRecords) {
		throw new Error(`Table's realRowsCount is ${table.realRowsCount}, should be ${numberOfRecords}`);
	}

	console.info('Test passed!');
	return true;
}
