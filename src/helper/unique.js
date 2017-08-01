"use strict";

module.exports = function unique(length=6) {
    return Math.random().toString(36).substr(2, length);
};