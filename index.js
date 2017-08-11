const Table = require('./bin/table');
const Query = require('./bin/query');

// Dev
var present = require('present');


// Main DB object
const db = {};

function createTable(tableName){
	if(db[tableName] = new Table()){
		return true;
	}
	else{
		return false;
	}
}

function insert(tableName, obj){
	if(db[tableName] == null){
		throw new Error('Table ' + tableName + " doesn't exist.");
	}
	else{
		let id = db[tableName].insert(obj);
		if(id){
			return id;
		}
		else{
			throw new Error('Could not insert object ' + JSON.stringify(obj) + " into table " + tableName);
		}
	}
}

function find(tableName, id){
	if(db[tableName] == null){
		throw new Error('Table ' + tableName + " doesn't exist.");
	}
	else{
		return db[tableName][id];
	}
}

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
					let shouldAddToArray = false;
					switch(comparison){
						case '=':
							shouldAddToArray = row[key] == value;
							break;
						case '>':
							shouldAddToArray = row[key] > value;
							break;
						case '>=':
							shouldAddToArray = row[key] >= value;
							break;
						case '<':
							shouldAddToArray = row[key] < value;
							break;
						case '<=':
							shouldAddToArray = row[key] <= value;
							break;
					}
					if(shouldAddToArray)
						selectedArray.push(row);
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

function construct(){
}

module.exports = construct;
module.exports.createTable = createTable;
module.exports.insert = insert;
module.exports.find = find;
module.exports.select = select;