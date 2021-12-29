const Operation = require('./QueryOperation');


module.exports = function Query() {

	// This syntax, so it'll be possibble to
	// call Query() directly (without "new" keyword).

	const newQuery = new function() {
		this.operations = [];

		this.where = _where.bind(this);
		this.first = _first.bind(this);
		this.last = _last.bind(this);
	}

	return newQuery;
}

function _where(key, comparison, value) {

	this.operations.push(
		new Operation('where', { 'key':key, 'comparison':comparison, 'value':value })
	);
	return this;
}

function _first(lastIndex) {
	this.operations.push(
		new Operation('first', { 'lastIndex':lastIndex })
	);
	return this;
}

function _last(firstIndex) {
	this.operations.push(
		new Operation('last', { 'firstIndex':firstIndex })
	);
	return this;
}
