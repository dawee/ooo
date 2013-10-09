# ooo

  Another async pattern for node, based on EventEmmitter

## Installation

```bash
$ npm install ooo
```

## How to

### Basics

```js
// Bind an event
ooo('echo', console.log);

// Fire an event
ooo('echo')('Hello World !');
```

### Bridges

```js
var ooo = require('./index.js');
var fs = require('fs');

ooo('file:read', function (err, data) {
    console.log(data.toString());
});

fs.readFile('index.js', ooo('file:read'));
```

### Insert parameters

```js
var ooo = require('./index.js');
var fs = require('fs');

ooo('file:read', function (msg1, err, data, msg2) {
    console.log(msg1, data.toString(), msg2);
});

fs.readFile('index.js', ooo('file:read').before('Here is the file').after('Good bye !'));
```
