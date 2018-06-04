const isObject = require('../helper/is-object');
const isArray = require('../helper/is-array');
const toJSON = require('../helper/to-json');
const each = require('../helper/each');

const Subscribers = require('./subscribers');

const MODEL = Symbol('model');
const KEYS = Symbol('keys');
const VALIDATE_FIELD_HANDLER = Symbol('validate field handler');
const NORMALIZE_FIELD_HANDLER = Symbol('normalize field handler');
const SUBSCRIBERS = Symbol('subscribers');


const METHODS = [
    "concat", "copyWithin", "entries", "fill", "pop", "push", "reduce",
    "reduceRight", "reverse", "shift", "slice", "sort", "splice", "unshift"
];


function makeModel(item, instanceSubscribers) {
    if (isArray(item)) {
        item = new ArrayModel(...item);
        item.attach(instanceSubscribers);
    }

    if (isObject(item)) {
        if (!(item instanceof Model)) {
            item = new Model(item);
        }

        item.attach(instanceSubscribers);
    }

    return item;
}


class ArrayModel extends Array {
    constructor(...args) {
        let sub = new Subscribers();

        args.map(item => {
            return makeModel(item, sub);
        });

        super(...args);

        this.patchValue = (model) => {
            throw 'ArrayModel does not support the method patchValue';
        };

        this.subscribe = (handler) =>  {
            sub.push(handler);
            return this;
        };

        this.toObject = () => {
            throw 'ArrayModel does not support the method toObject';
        };

        this.toForm = () => {
            throw 'ArrayModel does not support the method toForm';
        };

        this.attach = (instanceSubscribers) => {
            if (instanceSubscribers !== sub) {
                instanceSubscribers.append(sub.getHandlers());
                sub = instanceSubscribers;
            }
        };

        METHODS.forEach(key => {
            this[key] = (...args) => {
                const result = super[key](...args);

                for(let i = 0; i < this.length; i++) {
                    this[i] = makeModel(this[i], sub);
                }

                sub.trigger();

                return result;
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

        this[MODEL] = {};
        this[KEYS] = [];
        this[SUBSCRIBERS] = new Subscribers();

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

            field.value = makeModel(field.value, this[SUBSCRIBERS]);

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
        each(Object.keys(model), key => {
            let value = model[key];
            if (!this[KEYS].includes(key)) {
                throw `Unknown key (${key}) in model`;
            }

            if (!this[VALIDATE_FIELD_HANDLER](key, value)) {
                throw `A non-valid value was passed in the field (${key})`;
            }

            if (isArray(value)) {
                value = new ArrayModel(...value);
            }

            if (isObject(value)) {
                value = new Model(value);
            }

            value = this[NORMALIZE_FIELD_HANDLER](key, value);

            this[MODEL][key].value = value;
        });

        this[SUBSCRIBERS].trigger();
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
     * Передать управление подписчиками родителю
     * @param instanceSubscribers
     */
    attach(instanceSubscribers) {
        if (instanceSubscribers !== this[SUBSCRIBERS]) {
            instanceSubscribers.append(this[SUBSCRIBERS].getHandlers());
            this[SUBSCRIBERS] = instanceSubscribers;
        }
    };

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