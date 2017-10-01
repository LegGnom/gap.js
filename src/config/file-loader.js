const App = require('../app');
const isObject = require('../helper/is-object');
const isArray = require('../helper/is-array');
const ConfigStorage = require('./storage');


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
                App.emit('warning', err.stack)
            }
        }
    });

    Object.assign(ConfigStorage, config);
};
