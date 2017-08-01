"use strict";

const App = require('../app');
const isFunction = require('../helper/is-function');


module.exports = function execGenerator(generator, yieldValue) {
    try {
        if (generator && generator.next) {
            let next = generator.next(yieldValue);

            if (!next.done) {
                if (isFunction(next.value.then)) {
                    next.value.then(
                        result => execGenerator(generator, result),
                        err => generator.throw(err)
                    );
                } else {
                    execGenerator(generator, next.value);
                }
            } else {
                return next.value;
            }
        }
    } catch (err) {
        App.emit('error', err.stack);
    }
};