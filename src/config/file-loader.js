const each = require('../helper/each');
const isObject = require('../helper/is-object');
const isArray = require('../helper/is-array');
const isNode = require('../helper/is-node');
const ConfigStorage = require('./storage');

if (isNode()) {
    require('yaml-js');
}


module.exports = function load(...argv) {
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
                if (this.get('debug')) {
                    console.warn(err.stack);
                }
            }
        }
    });

    Object.assign(ConfigStorage, config);
};
