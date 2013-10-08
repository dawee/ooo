var EventEmitter = require('events').EventEmitter;
var them = {};

function array(args) {
    return Array.prototype.slice.call(args, 0)
};

function create() {
    
    var emitter = new EventEmitter();

    function ooo(ev, cb) {
        var before = [],
            after = [];

        if (typeof cb === 'function') {
            return emitter.on(ev, cb);
        }

        var wrap = function () {
            var args = before.concat(array(arguments), after);
            args.unshift(ev);
            console.log(args);
            emitter.emit.apply(emitter, args);
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

    ooo.it = function (name) {
        if (!them.hasOwnProperty(name)) {
            them[name] = create();
        }
        return them[name];
    };

    ooo.emitter = function (obj) {
        emitter = obj;
        return ooo;
    };

    return ooo;
}

module.exports = create();