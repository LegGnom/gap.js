"use strict";

const Wait = require('../wait');
const EventEmitter = require('../event-emitter');
const EventObject = require('./event-object');

const EVENT_ENVIRONMENT = Symbol('event environment');


class Middleware extends Wait {
    constructor(state) {
        super();

        this[EVENT_ENVIRONMENT] = new EventEmitter();


        if (this.onReady) {
            this.then(() => {
                this.onReady();
            });
        }
    }


    once(event_name, handler) {
        this[EVENT_ENVIRONMENT].once.apply(this[EVENT_ENVIRONMENT], arguments);
    }


    on(event_name, handler) {
        this[EVENT_ENVIRONMENT].on.apply(this[EVENT_ENVIRONMENT], arguments);
    }


    emit(event_name, ...params) {
        if (params[0] instanceof EventObject) {
            this[EVENT_ENVIRONMENT].emit.apply(this[EVENT_ENVIRONMENT], arguments);
        } else {
            new EventObject(this, event_name, params);
        }
    }

    removeEvent(event_name, handler) {
        this[EVENT_ENVIRONMENT].removeEvent.apply(this[EVENT_ENVIRONMENT], arguments);
    }
}


module.exports = Middleware;