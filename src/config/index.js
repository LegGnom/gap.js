"use strict";

const ConfigStorage = require('./storage');
const App = require('../app');
const isObject = require('../helper/is-object');
const isArray = require('../helper/is-array');
const each = require('../helper/each');
const isNode = require('../helper/is-node');

if (isNode()) {
    require('yaml-js');
}


module.exports =  {

    delimiter: '.',


    get(key, _default) {
        let storage = ConfigStorage;
        each(key.split(this.delimiter), part => {
            part = part.toUpperCase();
            storage = storage[part];
        });

        return storage !== undefined ? storage : _default;
    },


    set(key, value) {
        let storage = ConfigStorage;
        let parts = key.split(this.delimiter);

        each(parts, (part, index) => {
            part = part.toUpperCase();

            if (!storage.hasOwnProperty(part)) {
                storage[part] = {};
            }

            if (index >= parts.length -1) {
                storage[part] = value;
            } else {
                storage = storage[part];
            }
        });

        return this;
    },


    load(...argv) {
        let config = {};

        each(argv, item => {
            if (isObject(item)) {
                Object.assign(config, item);
            } else {
                try {
                    let conf = require(item);
                    if (isArray(conf)) {
                        each(conf, param => {
                            Object.assign(config, param);
                        });
                    } else {
                        Object.assign(config, conf);
                    }
                } catch (err) {
                    App.emit('error', err.stack)
                }
            }
        });

        Object.assign(ConfigStorage, config);
    }
};