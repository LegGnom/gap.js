'use strict';

module.exports = function isClass(value) {
    let data = value.toString().split('\n');
    let first_line = data.shift();
    let two_line = data.shift();

    return Boolean(first_line.includes('class ') || (two_line && two_line.includes('_classCallCheck')));
};