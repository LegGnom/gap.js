module.exports = function parseQueryString(query_string) {
    "use strict";

    if (typeof query_string !== "string" || query_string.length === 0) {
        return {};
    }
    query_string = query_string.split('?').pop();
    query_string = query_string.replace(/\+/g, ' ');
    query_string = query_string.split("&");

    let s_length = query_string.length;
    let bit;
    let query = {};
    let first;
    let second;

    for(let i = 0; i < s_length; i++) {
        bit = query_string[i].split("=");
        first = bit[0];

        if (first.length === 0) {
            continue;
        }

        second = bit[1];

        if (typeof query[first] === "undefined") {
            query[first] = second;
        } else if (query[first] instanceof Array) {
            query[first].push(second);
        } else {
            query[first] = [query[first], second];
        }
    }

    return query;
};