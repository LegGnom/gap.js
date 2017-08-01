"use strict";

const each = require('../helper/each');


class EventEmitter {
    constructor() {
        this._events = {};
    }

    /**
     * Подписаться на событие
     * @param event_name
     * @param handler
     */
    on(event_name, handler) {
        if (!this._events.hasOwnProperty(event_name)) {
            this._events[event_name] = [];
        }

        this._events[event_name].push(handler);
    }


    once(event_name, handler) {
        let once_handler = function() {
            handler.apply({}, arguments);
            this.remove_event(event_name, once_handler);
        }.bind(this);
        this.on(event_name, once_handler);
    }


    /**
     * Возбудить событие
     * @param event_name
     * @param params
     */
    emit(event_name, ...params) {
        if (this._events.hasOwnProperty(event_name)) {
            this._events[event_name].forEach(function (handler) {
                handler.apply({}, params);
            });
        }
    }


    /**
     * Удаление события
     * @param event_name
     * @param handler
     */
    remove_event(event_name, handler) {
        let list = [];

        if (this._events.hasOwnProperty(event_name)) {
            each(this._events[event_name], (item, index) => {
                if (item !== handler) {
                    list.push(item);
                }
            });

            this._events[event_name] = list;
        }
    }
}

module.exports = EventEmitter;
