var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

function array(args) {
    return Array.prototype.slice.call(args, 0)
};

function ooo(ev, cb) {
    var before = [],
        after = [];

    if (!!cb) {
        emitter.on(ev, cb);
    }

    var wrap = function () {
        var args = before.concat(array(arguments), after);
        args.unshift(ev);
        emitter.emit.apply(ooo, args);
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

module.exports = ooo;