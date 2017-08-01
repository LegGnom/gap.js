"use strict";

const each = require('../helper/each');
const Field = require('./field');

const FIELDS = Symbol('fields');
const FORM = Symbol('form');


class Middleware {
    constructor(form, fields) {
        this[FIELDS] = fields;
        this[FORM] = form;

        each(Object.keys(this[FIELDS]), field_key=> {
            let field = this[FIELDS][field_key];
            let value = this[FORM].get ? this[FORM].get(field_key) : this[FORM][field_key];

            if (!(field instanceof Field)) {
                field = this[FIELDS][field_key] = this[FIELDS][field_key]();
            }

            field.setValue(value);
            field.setForm(this);

            this[field_key] = field;
        });
    }


    validate() {
        let is = true;

        each(Object.keys(this[FIELDS]), field_key => {
            let field = this[FIELDS][field_key];

            if (!field.validate()) {
                is = false;
            }

        });

        return is;
    }

    get source() {
        let data = {};
        each(Object.keys(this[FIELDS]), field_key => {
            data[field_key] = this[FIELDS][field_key].data;
        });

        return data;
    }
}

module.exports = Middleware;