var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

function ooo(ev) {
    return function () {
        var args = Array.prototype.slice.call(arguments, 0);
        
        args.unshift(ev);
        ooo.emit.apply(ooo, args);
    };
};

ooo.on = emitter.on;
ooo.emit = emitter.emit;

module.exports = ooo;