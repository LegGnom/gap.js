const each = require('../helper/each');

const makeModel = require('./make-model');

const SUBSCRIBERS = Symbol('subscribers');
const TRIGGER = Symbol('trigger');

const METHODS = [
    "concat", "copyWithin", "entries", "fill", "map", "pop", "push", "reduce",
    "reduceRight", "reverse", "shift", "slice", "sort", "splice", "unshift"
];


module.exports = class ArrayModel extends Array {

    constructor(...args) {
        args.map(item => {
            return makeModel(item);
        });

        super(...args);

        this[SUBSCRIBERS] = [];

        METHODS.forEach(key => {
            this[key] = (...args) => {
                super[key](...args);
                this[TRIGGER]();
            }
        });
    }

    /**
     * Запуск подписчеков, после изменения модели
     */
    [TRIGGER]() {
        each(this[SUBSCRIBERS], item => {
            item(this);
        });
    }

    subscribe(handler) {
        this[SUBSCRIBERS].push(handler);
        return this;
    }
}