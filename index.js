var EventEmitter = require('events').EventEmitter;
var them = {};

function array(args) {
    return Array.prototype.slice.call(args, 0)
};

function create() {
    var any = {before: [], after: []},
        emitter = new EventEmitter();

    function ooo() {
        var evs = array(arguments);

        var before = any.before.slice(0),
            after = any.after.slice(0);

        if (typeof evs[evs.length - 1] === 'function') {
            var cb = evs[evs.length - 1],
                evs = evs.slice(0, evs.length - 1);
            
            evs.forEach(function (ev) {
                (emitter[ev.match('.*!$') ? 'once' : 'on'])(ev.replace(/!$/, ''), cb);
            });
        }

        var wrap = function () {
            var all = {args: before.concat(array(arguments), after)};
            evs.forEach(function (ev) {
                var args = all.args.slice(0);
                args.unshift(ev.replace(/!$/, ''));
                emitter.emit.apply(emitter, args);
            });
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

    ooo.before = function () {
        any.before = array(arguments);
        return ooo;
    };

    ooo.after = function () {
        any.after = array(arguments);
        return ooo;
    };

    return ooo;
}

module.exports = create();