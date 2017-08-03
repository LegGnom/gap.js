"use strict";

const Wait = require('../wait');
const EventEmitter = require('../event-emitter');
const EventObject = require('./event-object');


class Middleware extends Wait {
    constructor() {
        super();

        this.event_envirement = new EventEmitter();

        if (this.onReady) {
            this.then(() => {
                this.onReady();
            });
        }
    }


    once(event_name, handler) {
        this.event_envirement.once.apply(this.event_envirement, arguments);
    }


    on(event_name, handler) {
        this.event_envirement.on.apply(this.event_envirement, arguments);
    }


    emit(event_name, ...params) {
        if (params[0] instanceof EventObject) {
            this.event_envirement.emit.apply(this.event_envirement, arguments);
        } else {
            new EventObject(this, event_name, params);
        }
    }

    removeEvent(event_name, handler) {
        this.event_envirement.removeEvent.apply(this.event_envirement, arguments);
    }
}


module.exports = Middleware;