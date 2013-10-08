var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

function array(args) {
    return Array.prototype.slice.call(args, 0)
};

function ooo(ev) {
    var before = [],
        after = [];

    var wrap = function () {
        var args = before.concat(array(arguments), after);
        args.unshift(ev);
        ooo.emit.apply(ooo, args);
    };

    wrap.before = function () {
        before = array(arguments);
        return wrap;
    };

    wrap.after = function () {
        after = array(arguments);
        return wrap;
    };

    return wrap;
};

ooo.on = emitter.on;
ooo.emit = emitter.emit;

module.exports = ooo;