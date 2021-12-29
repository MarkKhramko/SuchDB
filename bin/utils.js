module.exports = {
	doesRowMatchComparison: _doesRowMatchComparison,
}

function _doesRowMatchComparison(
	row,
	key,
	value,
	comparison
) {
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
			return false;
	}

	return result;
}
