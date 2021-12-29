// Config:
const numberOfRecords = 500;
const mod = 4;
// SuchDB.
const { Database } = require('../../index');


module.exports = _run();

async function _run() {
	try {
		const DB = new Database('async_test');

		const table = DB.createTable('transactions');

		const insertions = [];
		for (let i=0; i < numberOfRecords; i++) {
			const rowData = {
				buy: 3021.31 + i,
				sell: 3021.31,
				profit: i,
			}

			insertions.push(rowData);
		}

		let maxInterval = 0;

		for (let i=0; i < numberOfRecords; i++) {
			const timeInterval = Math.random() * 100 + i%2;
			
			setTimeout(() => {
				const row = table.insert(insertions[i]);

				if (i%mod === 0) {
					table.deleteById(row.id);
				}

			}, timeInterval/2);

			maxInterval = maxInterval > timeInterval ? maxInterval : timeInterval;
		}

		// Wait for all operations.
		await (new Promise(resolve => setTimeout(resolve, maxInterval)));

		console.log({ table });

		// Check table:
		const properCount = numberOfRecords - numberOfRecords/mod;
		if (table.rows.length !== properCount) {
			throw new Error(`Table's number of rows is ${table.rows.length}, should be ${properCount}`);
		}

		if (table.rowsCount !== properCount) {
			throw new Error(`Table's rowsCount is ${table.rowsCount}, should be ${properCount}`);
		}

		if (table.realRowsCount !== properCount) {
			throw new Error(`Table's realRowsCount is ${table.realRowsCount}, should be ${properCount}`);
		}

		console.info('Test passed!');

		return true;
	}
	catch(error) {
		console.error(error);
	}
	finally {
		return Promise.resolve();
	}
}
