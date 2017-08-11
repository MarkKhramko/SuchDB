function operation(name, properties){
	this.name = name;
	this.properties = properties;
}

function construct(){
	this.operations = [];
}

function where(key, comparison, value){

	this.operations.push(
		new operation('where', {'key':key, 'comparison':comparison, 'value':value})
	);
	return this;
}

function first(lastIndex){
	this.operations.push(
		new operation('first', {'lastIndex':lastIndex})
	);
	return this;
}

function last(firstIndex){
	this.operations.push(
		new operation('last', {'firstIndex':firstIndex})
	);
	return this;
}

module.exports = construct;
module.exports.prototype.where = where;
module.exports.prototype.first = first;
module.exports.prototype.last = last;