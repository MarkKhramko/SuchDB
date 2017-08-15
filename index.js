const Table = require('./bin/table');
const Query = require('./bin/query');

/**
 * db - object that holds all tables
*/
const db = {};

function construct(){
}

// #section-begin Private API
/**
 * Returns result of comparing row's key with given value
 *
 * @param <Object> row
 * @param <String> key
 * @param <Object> value
 * @param <String> comparison
 * @return <Bool>
 */
function doesRowMathComparison(row, key, value, comparison){
	let result;
	switch(comparison){
		case '=':
			result = row[key] == value;
			break;
		case '>':
			result = row[key] > value;
			break;
		case '>=':
			result = row[key] >= value;
			break;
		case '<':
			result = row[key] < value;
			break;
		case '<=':
			result = row[key] <= value;
			break;
		default:
			result = false;
	}
	return result;
}
// #section-end Private API

// #section-begin Public API
/**
 * Returns bool of successfully creating new table
 *
 * @param <String> tableName
 * @return <Bool>
 */
function createTable(tableName){
	if(db[tableName] = new Table()){
		return true;
	}
	else{
		return false;
	}
}

/**
 * Returns ID of newly inserted row or Error object if there was error
 *
 * @param <String> tableName
 * @param <Object> row
 *
 * @return <String>
 */
function insert(tableName, row){
	if(db[tableName] == null){
		throw new Error('Table ' + tableName + " doesn't exist.");
	}
	else{
		let id = db[tableName].insert(row);
		if(id){
			return id;
		}
		else{
			throw new Error('Could not insert object ' + JSON.stringify(row) + " into table " + tableName);
		}
	}
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
function find(tableName, id){
	console.log('Needed: ' + id);
	if(db[tableName] == null){
		throw new Error('Table ' + tableName + " doesn't exist.");
	}
	else{
		let table = db[tableName];
		let rowsArray = table.rows;

		let foundRow = [];
		for(var i=0; i < rowsArray.length; i++){
			let row = rowsArray[i];
			if(row.id == id){
				foundRow = [row];
				break;
			}
		}
		return foundRow;
	}
}

/**
 * Returns array with rows that match query
 * or empty array, if nothing match.
 * Returns Error object, if given table doesnt exists
 *
 * @param <String> tableName
 * @param <Query> queryObj
 * @return <Array>
 */
function select(tableName, queryObj){

	if(db[tableName] == null){
		throw new Error('Table ' + tableName + " doesn't exist.");
	}
	else{
		let table = db[tableName];
		var resultArray = table.rows;

		queryObj.operations.forEach(function(queryOperation, index) {
			if(queryOperation.name === 'where'){

				const key = queryOperation.properties.key;
				const comparison = queryOperation.properties.comparison;
				const value = queryOperation.properties.value;

				var selectedArray = [];
				resultArray.forEach(function(row, index){
					let shouldAddToArray = doesRowMathComparison(
						row,
						key,
						value,
						comparison
					);
					if(shouldAddToArray){
						selectedArray.push(row);
					}
				});

				resultArray = selectedArray;
			}
			else if(queryOperation.name === 'first'){
				const queryLastIndex = queryOperation.properties.lastIndex;
				const maxIndex = queryLastIndex > resultArray.length ?
								resultArray.length : queryLastIndex;
				resultArray = resultArray.slice(0, maxIndex);
			}
			else if(queryOperation.name === 'last'){
				const queryFirstIndex = queryOperation.properties.firstIndex;
				const minIndex = queryFirstIndex < 0 ? 0 : queryFirstIndex;
				resultArray = resultArray.slice(minIndex, resultArray.length-1);
			}
		});
		return resultArray;
	}
}
// #section-end Public API

module.exports = construct;
module.exports.createTable = createTable;
module.exports.insert = insert;
module.exports.find = find;
module.exports.select = select;
module.exports.query = Query;