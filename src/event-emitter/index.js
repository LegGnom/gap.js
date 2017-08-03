"use strict";

const each = require('../helper/each');

const EVENT_STORAGE = Symbol('event storage');


class EventEmitter {
    constructor() {
        this[EVENT_STORAGE] = {};
    }

    /**
     * Подписаться на событие
     * @param event_name
     * @param handler
     */
    on(event_name, handler) {
        if (!this[EVENT_STORAGE].hasOwnProperty(event_name)) {
            this[EVENT_STORAGE][event_name] = [];
        }

        this[EVENT_STORAGE][event_name].push(handler);
    }


    /**
     * Устанавливает событие, срабатывает 1 раз
     * @param event_name
     * @param handler
     */
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
        if (this[EVENT_STORAGE].hasOwnProperty(event_name)) {
            this[EVENT_STORAGE][event_name].forEach(function (handler) {
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

        if (this[EVENT_STORAGE].hasOwnProperty(event_name)) {
            each(this[EVENT_STORAGE][event_name], (item, index) => {
                if (item !== handler) {
                    list.push(item);
                }
            });

            this[EVENT_STORAGE][event_name] = list;
        }
    }

    flush(name) {
        if (name) {
            this[EVENT_STORAGE][name] = [];
        } else {
            this[EVENT_STORAGE] = {};
        }
    }
}

module.exports = EventEmitter;
