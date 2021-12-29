const { Database } = require('../../index');


module.exports = _run();

function _run() {
	const DB = new Database('tests');

	const table = DB.createTable('transactions');

	const rowData = {
		buy: 3021.31,
		sell: null,
		profit: null,
	}
	table.insert(rowData);
	
	// Get row back:
	const row = table.selectLastRow();
	console.log({ row });


	// Check table:
	if (table.rowsCount !== 1) {
		throw new Error();
	}

	if (table.realRowsCount !== 1) {
		throw new Error();
	}


	// Delete row:
	table.deleteById(row.id);

	console.log({ table });

	// Check table:
	if (table.rows.length !== 0) {
		throw new Error();
	}

	if (table.rowsCount !== 0) {
		throw new Error();
	}

	if (table.realRowsCount !== 0) {
		throw new Error();
	}

	console.info('Test passed!');
	return true;
}
