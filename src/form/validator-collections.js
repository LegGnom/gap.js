"use strict";

const isString = require('../helper/is-string');


module.exports = {
    EMAIL(field) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(field.data);
    },

    MIN(value) {
        return function (field) {
            let length = isString(field.data) ? field.data.length : field.data;
            return length >= value;
        }
    },

    MAX(value) {
        return function (field) {
            let length = isString(field.data) ? field.data.length : field.data;
            return length <= value;
        }
    },

    EQUAL(value) {
        return function (field) {
            return field.data === field.form[value].data;
        }
    },

    REQUIRED(field) {
        return field.data !== undefined;
    },

    NUMERIC(field) {
        return !isNaN(Number(field.data || 0));
    }
};