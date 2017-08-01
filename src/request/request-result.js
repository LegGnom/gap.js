"use strict";

const toJSON = require('../helper/to-json');

const XHR = Symbol('xhr');
const REQUEST_BODY = Symbol('request body');


class RequestResult {
    constructor(xhr, body='') {
        this[XHR] = xhr;
        this[REQUEST_BODY] = xhr.responseText || body;
    }

    getHeader(name, _default) {
        return this[XHR].headers[name] || _default;
    }

    getHeaders() {
        return this[XHR].headers;
    }

    get status() {
        return this[XHR].status || this[XHR].statusCode;
    }

    get body() {
        return this[REQUEST_BODY];
    }

    get json() {
        return toJSON(this[REQUEST_BODY]);
    }

    abort() {
        this[XHR].abort();
    }
}


module.exports = RequestResult;