# SuchDB
### Real time JS database, fully loaded into memory.
### !Proof of work, not for commercial use!
Install:
```
npm install suchdb --save
```

Basic use:
```
var suchdb = require('suchdb');
...
// Create table
suchdb.createTable('transactions');
// Insert data
suchdb.insert('transactions', {'amount':90, "currency":"Euro", "sender":"John Appleseed", "receiver":"Steve Props"});
```
Query usage:
```
var suchdb = require('suchdb');
var Query = suchdb.query;
...
// Create query object
let query = new Query().where('amount', '>=', 89).first(10);
// Perform rows selection
let rows = suchdb.select('transactions', query);
// Result (considering data in previous example)
// [{'id':<uuid>, 'amount':90, "currency":"Euro", "sender":"John Appleseed", "receiver":"Steve Props"}]
```