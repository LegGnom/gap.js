"use strict";

const ConfigStorage = require('./storage');
const each = require('../helper/each');
const fileLoader = require('./file-loader');


module.exports =  {

    delimiter: '.',


    argvInit() {
        each(process.argv, item => {
            if (item.indexOf('--') == 0) {
                let vars = item.replace('--', '').split('=');
                this.set(vars[0], vars[1]);
            }
        })
    },


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