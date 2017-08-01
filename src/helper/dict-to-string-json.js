"use strict";

module.exports = function dictToStringJSON(data) {
    try {
        return JSON.stringify(data);
    } catch (e) {
        return JSON.stringify({});
    }
};