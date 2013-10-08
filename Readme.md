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

ooo.on('file:read', function (err, data) {
    console.log(data.toString());
});

ooo.on('app:start', function () {
    fs.readFile('index.js', ooo('file:read'));
});

ooo.trigger('app:start');
```