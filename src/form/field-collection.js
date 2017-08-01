"use strict";

const Field = require('./field');
const ValidatorCollections = require('./validator-collections');


const FieldCollection = {
    STRING: function (params) {
        return new Field(function (value) {
            return value ? value.toString().trim() : '';
        }, params);
    },

    NUMBER: function (params={}) {
        params.validators = params.validators || [];
        params.validators.push(ValidatorCollections.NUMERIC);
        
        return new Field(function (value) {
            return Number(value);
        }, params);
    },

    BOOLEAN: function (params) {
        return new Field(function (value) {
            return Boolean(value);
        }, params)
    },

    DATE: function (params) {
        return new Field(function (value) {
            return new Date(value);
        }, params);
    }
};


module.exports = FieldCollection;