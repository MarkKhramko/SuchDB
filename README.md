# SuchDB

* Real-time JS database, fully loaded into memory.

### !Proof of work, not for commercial use!
### !In case of use, please perform all record validation yourself, before insertion in tables.


## Install:
```sh
npm install suchdb
```


## Basic use:

### Insert
```js
const { Database } = require('suchdb');
...
// Create Database.
const db = new Database('real_time_db')

// Create table.
const table = db.createTable('transactions');

// Insert record:
const data = {
	'amount': 90,
	'currency': 'Euro',
	'sender': 'John Appleseed',
	'receiver': 'Steve Props'
};
db.insert('transactions', data);
// or
table.insert(data);
```

### Find
```js
const result = db.findById('transactions', '<uuid>');
// Result (considering data in previous example)
// [
// 	{
//		'id': <uuid>,
//		'amount': 90,
//		'currency': 'Euro',
//		'sender': 'John Appleseed',
//		'receiver': 'Steve Props'
//	}
// ]
```

### Select first or last row
```js
const firstRow = db.selectFirstRow('transactions');
const lastRow = db.selectLastRow('transactions');
````

### Delete
```js
// (considering data in previous example)
db.deleteById('transactions', '<uuid>');
```


## Query usage:
```js
const { Query } = require('suchdb');
...
// Create query object (Notice, that you don't need "new" keyword).
const query = Query().where('amount', '>=', 89).first(10);

// Perform rows selection.
const rows = db.select('transactions', query);
// Result (considering data in previous example)
// [
// 	{
//		'id': <uuid>,
//		'amount': 90,
//		'currency': 'Euro',
//		'sender': 'John Appleseed',
//		'receiver': 'Steve Props'
//	}
// ]
```
