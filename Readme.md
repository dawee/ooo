# ooo

  Simple bridge from callback system to EventEmitter

## Installation

```bash
$ npm install ooo
```
## How to

```js
var ooo = require('./index.js');
var fs = require('fs');

ooo.on('file:read', function (err, data, msg) {
    console.log(msg, data.toString());
});

ooo.on('app:start', function () {
    fs.readFile('index.js', ooo('file:read').after('index.js data :'));
});

ooo.emit('app:start');
```