"use strict";

const each = require('../helper/each');

const VALUE = Symbol('value');
const PARAMS = Symbol('params');
const FORM = Symbol('form');
const NORMALIZE_HANDLER = Symbol('normalize handler');


class Field {
    constructor(normalize_handler, params={}) {
        this[VALUE] = undefined;
        this[FORM] = undefined;
        this[NORMALIZE_HANDLER] = normalize_handler;

        this[PARAMS] = Object.assign({
            validators: [],
            default: null,
            choices: []
        }, params);
    }

    get form() {
        return this[FORM];
    }

    setForm(form) {
        this[FORM] = form;
    }

    setValue(value) {
        this[VALUE] = value;
    }

    get data() {
        return this[NORMALIZE_HANDLER](this[VALUE]);
    }

    validate() {
        let is = true;

        each(this[PARAMS].validators, validator => {
            if (!validator(this)) {
                is = false;
            }
        });

        return is;
    }
}


module.exports = Field;