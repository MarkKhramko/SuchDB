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

	// Operations with tables:
	this.createTable = _createTable.bind(this);
	this.getTable = _getTable.bind(this);

	
	// Operations in tables:

	// 	Create.
	this.insert = _insert.bind(this);

	//	Read:
	this.findById = _findById.bind(this);
	this.selectFirstRow = _selectFirstRow.bind(this);
	this.selectLastRow = _selectLastRow.bind(this);
	this.select = _select.bind(this);

	// Operations in tables\

	// Validations.
	this.validateTableExistance = _validateTableExistance.bind(this);
}

/**
 * Returns newly created table.
 *
 * @param <String> tableName
 *
 * @return <Table>
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
 * Returns table if exists,
 * return null, if table with this name not found.
 *
 * @param <String> tableName
 *
 * @return <Table>
 */
function _getTable(
	tableName
) {
	try {
		this.validateTableExistance(tableName);
	}
	catch(error) {
		return false;
	}

	return this.tables[tableName];
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
	this.validateTableExistance(tableName);
	
	const table = this.tables[tableName];
	return table.insert(rowData);
}

/**
 * Returns found row or null.
 *
 * @param <String> tableName
 * @param <String> id
 *
 * @return <Object>
 */
function _findById(
	tableName,
	id
) {
	this.validateTableExistance(tableName);

	const table = this.tables[tableName];
	return table.findById(id);
}

/**
 * Returns first inserted row.
 *
 * @param <String> tableName
 * 
 * @return <Object>
 */
function _selectFirstRow(tableName) {
	this.validateTableExistance(tableName);

	const table = this.tables[tableName];
	return table.selectFirstRow();
}

/**
 * Returns last inserted row.
 *
 * @param <String> tableName
 * 
 * @return <Object>
 */
function _selectLastRow(tableName) {
	this.validateTableExistance(tableName);

	const table = this.tables[tableName];
	return table.selectLastRow();
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
	this.validateTableExistance(tableName);

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
	this.validateTableExistance(tableName);

	const table = this.tables[tableName];
	return table.deleteById(id);
}

/**
 * Validator.
 *
 * @param <String> tableName
 */
function _validateTableExistance(tableName) {
	if (!this.tables[tableName]) {
		const err = new Error(`Table ${tableName} doesn't exist.`);
		throw err;
	}

	return true;
}
