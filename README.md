# RamDB
### Real time JS database, fully loaded into memory.
### !Proof of work, not for commercial use!
Basic use:
```
var ramdb = require('<path>');
var Query = ramdb.query;
...
ramdb.createTable('transactions');
ramdb.insert('transactions', {'amount':90, "currency":"Euro", "sender":"John Appleseed", "receiver":"Steve Props"});
let query = new Query().where('amount', '>=', 89).first(10);
let rows = select('transactions', query);
// Result
// [{'id':<uuid>, 'amount':90, "currency":"Euro", "sender":"John Appleseed", "receiver":"Steve Props"}]
```