const uuid = require('uuid');
const { doesRowMatchComparison } = require('./utils');


module.exports = function Table(name=undefined) {
	if (!name) {
		const err = new Error('Table must have a name');
		throw err;
	}
	this.name = name;

	// State:
	this.rows = [];
	//	Rows count shows the number of non-deleted rows.
	this.rowsCount = 0;
	//	Real rows count shows the number of all elements in rows array.
	this.realRowsCount = 0;
	//	Bind of row Id to index in rows.
	this.hashTable = {};


	// CRUD Methods:
	
	// 	Create.
	this.insert = _insert.bind(this);

	//	Read:
	this.findById = _findById.bind(this);
	this.selectFirstRow = _selectFirstRow.bind(this);
	this.selectLastRow = _selectLastRow.bind(this);
	this.select = _select.bind(this);

	//	Update:
	// @TODO

	//	Delete.
	this.deleteById = _deleteById.bind(this);
}

/**
 * Returns newly inserted row.
 *
 * @param <Object> rowData
 *
 * @return <Object>
 */
function _insert(rowData={}) {
	// Generate unique random id.
	const id = uuid.v4();

	const _record = {
		...rowData,
		'id': id,
		'createdAt': new Date(),
		'updatedAt': null,
	};
	
	this.rows.push(_record);

	// Save id and array's index as hash.
	this.hashTable[id] = this.realRowsCount;

	// Increase counters:
	this.rowsCount++;
	this.realRowsCount++;

	return _record;
}

/**
 * Returns found row or null.
 *
 * @param <String> id
 *
 * @return <Object>
 */
function _findById(id) {
	const rowIndex = this.hashTable[id];
	return this.rows[rowIndex];
}

/**
 * Returns first inserted row.
 * 
 * @return <Object>
 */
function _selectFirstRow() {
	return this.rows[0];
}

/**
 * Returns last inserted row.
 * 
 * @return <Object>
 */
function _selectLastRow() {
	return this.rows[this.realRowsCount - 1];
}

/**
 * Returns array with rows that match query
 * or empty array, if nothing matched.
 *
 * @param <Query> queryObj
 * @return <Array>
 */
async function _select(queryObj) {
	try {
		let resultArray = [];

		const { operations } = queryObj;
		for (const queryOperation of operations) {
			if (queryOperation.name === 'where') {

				const {
					key,
					comparison,
					value
				} = queryOperation.properties;

				let index = 0;
				while (index < this.realRowsCount) {
					const row = this.rows[index];

					let shouldAddToArray = doesRowMatchComparison(
																	row,
																	key,
																	value,
																	comparison
																);
					
					if (shouldAddToArray)
						resultArray.push(row);

					index++;
				}
			}
			else if (queryOperation.name === 'first') {
				const queryLastIndex = queryOperation.properties.lastIndex;
				const maxIndex = queryLastIndex > resultArray.length ?
								resultArray.length : queryLastIndex;
				
				resultArray = resultArray.slice(0, maxIndex);
			}
			else if (queryOperation.name === 'last') {
				const queryFirstIndex = queryOperation.properties.firstIndex;
				const minIndex = queryFirstIndex < 0 ? 0 : queryFirstIndex;
				
				resultArray = resultArray.slice(minIndex, resultArray.length-1);
			}
		}

		return Promise.resolve(resultArray);
	}
	catch(error) {
		return Promise.reject(error);
	}
}

/**
 * Sets record as deleted (as null).
 *
 * @param <String> id
 */
function _deleteById(id) {
	const rowIndex = this.hashTable[id];

	// If it's last element of array, delete it:
	if (rowIndex === this.realRowsCount-1) {
		this.rows.pop();
		this.realRowsCount--;
	}
	// Otherwise, set this row as null:
	else {
		this.rows[rowIndex] = null;
	}

	// Decrease rowsCount.
	this.rowsCount--;

	// Delete id from hash.
	delete this.hashTable[id];
}
