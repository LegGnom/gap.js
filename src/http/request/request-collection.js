"use strict";

const isArray = require('../../helper/is-array');
const isFunction = require('../../helper/is-function');
const isObject = require('../../helper/is-object');
const each = require('../../helper/each');

const MIDDLEWARE_DATA = Symbol('middleware data');


class RequestCollection {
    constructor(data={}) {
        this[MIDDLEWARE_DATA] = data instanceof RequestCollection ? data.source : data;
    }

    get(name, _default) {
        let value = this[MIDDLEWARE_DATA][name];

        if (isArray(value)) {
            value = value[0];
        }

        return value || _default;
    }

    getList(name, _default) {
        let value = this[MIDDLEWARE_DATA][name];

        if (!isArray(value)) {
            value = [value];
        }

        return value || _default;
    }

    get source() {
        return this[MIDDLEWARE_DATA];
    }

    map(handler) {
        let new_data = {};

        if (isFunction(handler) && isObject(this[MIDDLEWARE_DATA])) {
            each(Object.keys(this[MIDDLEWARE_DATA]), key => {
                new_data[key] = handler(this[MIDDLEWARE_DATA][key], key);
            });

            return new_data;
        }

        return this[MIDDLEWARE_DATA];
    }
}

module.exports = RequestCollection;