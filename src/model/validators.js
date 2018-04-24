const isNumber = require('../helper/is-number');
const isString = require('../helper/is-string');
const isArray = require('../helper/is-array');
const isObject = require('../helper/is-object');


module.exports = {
    NUMBER() {
        return function(value) {
            return isNumber(value);
        }
    },

    MIN(min) {
       return function (value) {
           return this.NUMBER(value) && value * 1 >= min;
       }
    },

    MAX(max) {
        return function (value) {
            return this.NUMBER(value) && value * 1 <= max;
        }
    },

    STRING() {
        return function(value) {
            return isString(value);
        }
    },

    ARRAY() {
        return function(value) {
            return isArray(value);
        }
    },

    OBJECT() {
        return function(value) {
            return isObject(value);
        }
    }
};