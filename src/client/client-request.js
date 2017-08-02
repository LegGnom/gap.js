"use strict";

const libHTTP = require('../http');


module.exports = function(request) {
    return new libHTTP.Request({
        method: 'GET',
        url: window.location.pathname + window.location.search,
        headers: {
            cookie: document.cookie
        }
    });
};