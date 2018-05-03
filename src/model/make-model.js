const isObject = require('../helper/is-object');
const isArray = require('../helper/is-array');

const ArrayModel = require('./array-model');
const Model = require('./index');


module.exports = function makeModel(item) {
    if (isArray(item)) {
        return new ArrayModel(...item);
    }

    if (isObject(item) && !(item instanceof Model)) {
        return new Model(item);
    }

    return item;
};