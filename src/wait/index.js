"use strict";

const each = require('../helper/each');

const PROMISE_LIST = Symbol('promise list');
const IS_RUN_WAIT = Symbol('is run wait');
const THEN_LIST = Symbol('then list');
const CATCH_LIST = Symbol('catch list');
const APPEND_PROMISE = Symbol('append handler');
const PROMISE = Symbol('promise');

class Wait {
    constructor() {
        this[PROMISE] = null;
        this[IS_RUN_WAIT] = false;
        this[PROMISE_LIST] = [];
        this[THEN_LIST] = [];
        this[CATCH_LIST] = [];

        setTimeout(() => this.finally(), 1);
    }

    wait(...promise) {
        this[PROMISE] = null;
        this[PROMISE_LIST] = this[PROMISE_LIST].concat(...promise);
        return this;
    }


    then(handler) {
        this[APPEND_PROMISE](handler);
        return this;
    }

    catch(handler) {
        this[APPEND_PROMISE](false, handler);
        return this;
    }

    finally(handler) {
        if (!this[IS_RUN_WAIT]) {
            this[IS_RUN_WAIT] = true;
            this[APPEND_PROMISE](handler);

            this[PROMISE] = Promise.all(this[PROMISE_LIST]);

            each(this[THEN_LIST], handler => {
                this[PROMISE].then(handler);
            });

            each(this[CATCH_LIST], handler => {
                this[PROMISE].catch(handler);
            });
        } else {
            if (!this[PROMISE]) {
                this[IS_RUN_WAIT] = false;
                return this.finally(handler);
            } else {
                this.then(handler);
            }
        }
        return this;
    }

    get promise() {
        return this[APPEND_PROMISE]();
    }

    [APPEND_PROMISE](then_handler, catch_handler) {
        if (!this[IS_RUN_WAIT] || !this[PROMISE]) {
            if (then_handler) {
                this[THEN_LIST].push(then_handler);
            }

            if (catch_handler) {
                this[CATCH_LIST].push(catch_handler);
            }
        } else {
            if (then_handler) {
                this[PROMISE].then(then_handler);
            }

            if (catch_handler) {
                this[PROMISE].catch(catch_handler);
            }
        }

        return this[PROMISE];
    }
}


module.exports = Wait;