const UUIdV4 = require('uuid/v4');

function construct() {
	this.rows = [];
}

function insert(obj){
	const id = UUIdV4();
	obj['id'] = id;
	this.rows.push(obj);
	return id;
}

module.exports = construct;
module.exports.prototype.insert = insert;