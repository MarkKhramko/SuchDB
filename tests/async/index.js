// Config:
const numberOfRecords = 5000;
const mod = 4;
// SuchDB.
const { Database } = require('../../index');


module.exports = _run();

async function _run() {
	try {
		const db = new Database('async_test');

		const table = db.createTable('transactions');

		const insertions = [];
		
		let i =0;
		while(i < numberOfRecords) {
			const rowData = {
				buy: 3021.31,
				sell: 3021.31 + i,
				profit: i,
			}

			insertions.push(rowData);
			i++;
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
