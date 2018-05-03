const isObject = require('../helper/is-object');
const isArray = require('../helper/is-array');
const toJSON = require('../helper/to-json');
const each = require('../helper/each');


const TIMER_INTERVAL = 1;

const MODEL = Symbol('model');
const KEYS = Symbol('keys');
const VALIDATE_FIELD_HANDLER = Symbol('validate field handler');
const NORMALIZE_FIELD_HANDLER = Symbol('normalize field handler');
const SUBSCRIBERS = Symbol('subscribers');
const TRIGGER = Symbol('trigger');
const TIMER_MODEL = 0;


const METHODS = [
    "concat", "copyWithin", "entries", "fill", "map", "pop", "push", "reduce",
    "reduceRight", "reverse", "shift", "slice", "sort", "splice", "unshift"
];


function makeModel(item, subscriber) {
    if (isArray(item)) {
        item = new ArrayModel(...item);
        item.subscribe(subscriber);
    }

    if (isObject(item)) {
        if (!(item instanceof Model)) {
            item = new Model(item);
        }

        item.subscribe(subscriber);
    }

    return item;
}


class ArrayModel extends Array {

    constructor(...args) {
        let timer = 0;

        const SUBSCRIBERS = [];
        const trigger = () => {
            each(this, item => {
                makeModel(item, trigger);
            });

            each(SUBSCRIBERS, item => {
                item(this);
            });
        };

        args.map(item => {
            return makeModel(item, trigger);
        });

        super(...args);

        this.patchValue = (model) => {
            throw 'ArrayModel does not support the method patchValue';
        };

        this.subscribe = (handler) =>  {
            SUBSCRIBERS.push(handler);
            return this;
        };

        this.toObject = () => {
            throw 'ArrayModel does not support the method toObject';
        };

        this.toForm = () => {
            throw 'ArrayModel does not support the method toForm';
        };

        METHODS.forEach(key => {
            this[key] = (...args) => {
                super[key](...args);
                clearTimeout(timer);
                timer = setTimeout(trigger, TIMER_INTERVAL);
            }
        });
    }
}


class Model {
    constructor(model) {
        if (isArray(model)) {
            return new ArrayModel(...model);
        }

        if (!isObject(model)) {
            throw 'The model must be an object';
        }

        this[TIMER_MODEL] = 0;

        this[MODEL] = {};
        this[KEYS] = [];
        this[SUBSCRIBERS] = [];

        each(Object.keys(model), key => {
            let field = model[key];

            const settingsField = {
                value: null,
                normalize: [],
                validators: []
            };

            if (!isObject(field)) {
                field = {
                    value: field,
                }
            }

            field.value = makeModel(field.value, this[TRIGGER].bind(this));

            settingsField.value = field.value || null;
            settingsField.normalize = field.normalize || [];
            settingsField.validators = field.validators || [];

            this[KEYS].push(key);
            this[MODEL][key] = settingsField;

            Object.defineProperty(this, key, {
                set(value) {
                    if (this[MODEL][key].value === value) {
                        return
                    }

                    const data = {};
                    data[key] = value;

                    this.patchValue(data);
                },

                get() {
                    return this[MODEL][key].value;
                }
            });
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

    /**
     * Валидация поля
     * @param field_name
     * @param value
     * @returns {boolean}
     */
    [VALIDATE_FIELD_HANDLER](field_name, value) {
        const field = this[MODEL][field_name];
        let isValidate = true;

        each(field.validators, validator => {
            if (!validator(value, field_name, this[MODEL])) {
                isValidate = false;
            }
        });

        return isValidate;
    }

    /**
     * Функция нормализации данных
     * @param field_name
     * @param value
     * @returns {*}
     */
    [NORMALIZE_FIELD_HANDLER](field_name, value) {
        const field = this[MODEL][field_name];

        each(field.normalize, handler => {
            value = handler(value, field_name);
        });

        return value;
    }

    /**
     * Изменение данных модели
     * @param model
     * @returns {Model}
     */
    patchValue(model) {
        clearTimeout(this[TIMER_MODEL]);

        each(Object.keys(model), key => {
            let value = model[key];
            if (!this[KEYS].includes(key)) {
                throw `Unknown key (${key}) in model`;
            }

            if (!this[VALIDATE_FIELD_HANDLER](key, value)) {
                throw `A non-valid value was passed in the field (${key})`;
            }

            if (isArray(value)) {
                value = new ArrayModel(value);
            }

            if (isObject(value)) {
                value = new Model(value);
            }

            value = this[NORMALIZE_FIELD_HANDLER](key, value);

            this[MODEL][key].value = value;
        });

        this[TIMER_MODEL] = setTimeout(this[TRIGGER].bind(this), TIMER_INTERVAL);
        return this;
    }

    /**
     * Устновить функцию подписчик на модели
     * @param handler
     * @returns {Model}
     */
    subscribe(handler) {
        this[SUBSCRIBERS].push(handler);
        return this;
    }

    /**
     * Возвращает чистый объект
     * @returns {{}}
     */
    toObject() {
        const obj = {};
        each(this[KEYS], key => {
            obj[key] = this[MODEL][key].value;
        });
        return obj;
    }

    /**
     * Преобразовать данные в форму
     * @returns {FormData}
     */
    toForm() {
        const form = new FormData

        each(Object.keys(this[MODEL]), key => {
            let value = this[MODEL][key].value;

            if (isArray(value)) {
                value = value.join(',');

            } else if (isObject(value)) {
                value = toJSON(value);
            }

            form.append(key, value.toString());
        });

        return form
    }
}


module.exports = Model;