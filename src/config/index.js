"use strict";

const ConfigStorage = require('./storage');
const each = require('../helper/each');
const isNode = require('../helper/is-node');
const fileLoader = require('./file-loader');

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
        return fileLoader.apply(this, argv);
    }
};