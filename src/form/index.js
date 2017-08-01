"use strict";

const ValidatorCollections = require('./validator-collections');
const FieldCollection = require('./field-collection');
const Middleware = require('./middleware');


const Form = {
    create(fields) {
        return function (form) {
            return new Middleware(form, fields);
        };
    },

    field: FieldCollection,
    validator: ValidatorCollections
};


module.exports = Form;