"use strict";

const isFunction = require('../helper/is-function');
const each = require('../helper/each');
const EventEmitter = require('../event-emitter');

const CURSOR = Symbol('cursor');
const IS_STOP_PROPAGATION = Symbol('is stop propagation');


class EventObject extends EventEmitter {
    constructor(component, event_name, params) {
        let callback;

        super();

        if (isFunction(params[params.length -1])) {
            callback = params.pop();
        }

        /**
         * Первым аргументов в событии всегда будет объект самого события
         */
        params.unshift(this);


        /**
         * Функция которая будет вызвана по завершению всплытия события
         */
        this.callback = callback;


        /**
         * Курсор передвижения по стеку
         * @type {number}
         * @private
         */
        this[CURSOR] = 0;


        /**
         * Тригер остановки вспылтия события
         * @type {boolean}
         */
        this[IS_STOP_PROPAGATION] = false;


        /**
         * Компонент с которого всплывает событие
         */
        this.target = component;


        /**
         * Название компоненты
         */
        this.name = component.constructor.component_name;


        /**
         * Стек компонент по которому пройдет событие начиная от текущей компоненты
         */
        this.stack = [component];


        if (component.node) {
            this.stack = this.stack.concat(
                component.getParents()
            );
        }


        /**
         * Имя события
         */
        this.event_name = event_name;


        /**
         * Параметры события
         */
        this.params = params;


        /**
         * Стартуем обход по стеку событий
         */
        this.start();
    }


    /**
     * Остановить всплытие события
     */
    stopPropagation() {
        this[IS_STOP_PROPAGATION] = true;
    }


    /**
     * Запустить/возобновить всплытие события
     */
    start() {
        let components;
        let trigger = function(component, event_name, params) {
            if (component && component.emit) {
                component.emit(event_name, ...params);
            }
        };

        this[IS_STOP_PROPAGATION] = false;

        while (components = this.stack[this[CURSOR]]) {
            if (this[IS_STOP_PROPAGATION]) {
                break;
            }

            if (Array.isArray(components)) {
                each(components, component => {
                    trigger(component, this.event_name, this.params);
                });
            } else {
                trigger(components, this.event_name, this.params);
            }

            this[CURSOR] += 1;
        }

        if (this[CURSOR] >= this.stack.length && this.callback) {
            this.callback.apply({}, this.params);
        }
    }
};

module.exports = EventObject;