"use strict";

const crypto = require('crypto');
const Config = require('../config');


function md5(string) {
    return crypto.createHash('md5').update(string).digest('hex');
}


function generateSalt(string) {
    let salt = Config.get('secret');
    let len = string.length;
    let result = [];

    for (let i = 0; i < len; i++) {
        result.push(string[i]);

        if (salt[i]) {
            result.push(salt[i]);
        }
    }

    return result.join('');
}


module.exports = function generatePassword(password) {
    let hash = md5(generateSalt(password));
    return generateSalt(hash);
};