const each = require('../helper/each');
const isFunction = require('../helper/is-function');

const PRIMARY = Symbol('primary');
const SECONDARY = Symbol('secondary');
const TIMER = 0;
const INTERVAL = 10;


module.exports = class Subscribers {
    constructor() {
        this[TIMER] = 0;
        this[PRIMARY] = [];
        this[SECONDARY] = [];
    }

    append(subscribers) {
        this[SECONDARY].push(...subscribers);
    }

    trigger() {
        clearTimeout(this[TIMER]);

        this[TIMER] = setTimeout(() => {
            each(this[SECONDARY], handler => {
                handler();
            });

            each(this[PRIMARY], handler => {
                handler();
            });
        }, INTERVAL);
    }

    push(handler) {
        if (!isFunction(handler)) {
            throw 'Subscriber must be a function';
        }

        this[PRIMARY].push(handler)
    }

    getHandlers() {
        clearTimeout(this[TIMER]);
        return [...this[PRIMARY], ...this[SECONDARY]];
    }
}