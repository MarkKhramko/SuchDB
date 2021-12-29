const Table = require('./Table');
const Query = require('./Query');


/**
 * Database - object that holds all tables.
*/
module.exports = function Database(name) {
	if (!name) {
		const err = new Error('Database must have a name');
		throw err;
	}
	this.name = name;

	// List of tables.
	this.tables = {};

	this.createTable = _createTable.bind(this);

	// Operations with tables:
	this.insert = _insert.bind(this);
	this.findById = _findById.bind(this);
	this.select = _select.bind(this);
	this.deleteById = _deleteById.bind(this);
}

/**
 * Returns newly created table.
 *
 * @param <String> tableName
 *
 * @return <Bool>
 */
function _createTable(
	tableName
) {
	try {
		this.tables[tableName] = new Table(tableName);
		return this.tables[tableName];
	}
	catch(error) {
		console.error(error);
		throw error;
	}
}

/**
 * Returns newly inserted row.
 *
 * @param <String> tableName
 * @param <Object> rowData
 *
 * @return <Object>
 */
function _insert(
	tableName,
	rowData={}
) {
	_errorIfTableDoesntExist(tableName);
	
	const table = this.tables[tableName];
	return table.insert(row);
}

/**
 * Returns array with one row, where id is equal to given
 * or empty array, if nothing found.
 * Returns Error object, if given table doesnt exists
 *
 * @param <String> tableName
 * @param <String> id
 * @return <Array>
 */
function _findById(
	tableName,
	id
) {
	_errorIfTableDoesntExist(tableName);

	const table = this.tables[tableName];
	return table.findById(id);
}

/**
 * Returns array with rows that match query
 * or empty array, if nothing match.
 *
 * Returns Error, if given table doesnt exists
 *
 * @param <String> tableName
 * @param <Query> queryObj
 *
 * @return <Array>
 */
async function _select(
	tableName,
	queryObj
) {
	_errorIfTableDoesntExist(tableName);

	const table = this.tables[tableName];
	return table.select(queryObj);
}

/**
 * Sets record as deleted (as null).
 *
 * @param <String> tableName
 * @param <String> id
 */
function _deleteById(
	tableName,
	id
) {
	_errorIfTableDoesntExist(tableName);

	const table = this.tables[tableName];
	return table.deleteById(id);
}

/**
 * Validator.
 *
 * @param <String> tableName
 */
function _errorIfTableDoesntExist(tableName) {
	if (!this.tables[tableName]) {
		const err = new Error(`Table ${tableName} doesn't exist.`);
		throw err;
	}

	return true;
}
