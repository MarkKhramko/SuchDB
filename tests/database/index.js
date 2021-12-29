// Config:
const numberOfRecords = 50000;
// SuchDB.
const { Database } = require('../../index');
// Perfomance measure.
const { performance } = require('perf_hooks');


module.exports = _run();

function _run() {
	const db = new Database('tests');

	db.createTable('transactions');

	_insertPseudoRecords(db, 'transactions');

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

	// Check first & last row:
	const firstRow = db.selectFirstRow('transactions');
	if (firstRow.profit !== 0) {
		console.error(`Table's first row is corrupted.`, firstRow);
		throw new Error(`Table's first row is corrupted.`);
	}

	const lastRow = db.selectLastRow('transactions');
	if (lastRow.profit !== numberOfRecords - 1) {
		console.error(`Table's last row is corrupted.`, lastRow);
		throw new Error(`Table's last row is corrupted.`);
	}

	console.info('Test passed!');
	return true;
}

function _insertPseudoRecords(
	database,
	tableName
) {
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

		database.insert(tableName, rowData);

		i++;
	}

	const endTime = performance.now();

	console.log(`Call to insert ${numberOfRecords} took ${endTime - startTime} milliseconds`);
}
