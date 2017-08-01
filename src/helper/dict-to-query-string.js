"use strict";

const each = require('./each');


module.exports = function dictToQueryString(dict, prefix) {
    let query = [];

    each(Object.keys(dict), item => {
        let prefix_key = isNaN(item) ? item : '';
        let key = prefix ? prefix + "[" + prefix_key + "]" : item;
        let value = dict[item];
        let chunk;

        if (value !== null && typeof value === "object") {
            chunk = dictToQueryString(value, key);
        } else {
            chunk = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        }

        query.push(chunk);
    });

    return query.join("&");
};