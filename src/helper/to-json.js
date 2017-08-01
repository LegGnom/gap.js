"use strict";

module.exports = function toJSON(string) {
    try {
        return JSON.parse(string);
    } catch (e) {
        return {}
    }
};