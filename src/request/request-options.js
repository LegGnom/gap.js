"use strict";

const isObject = require('../helper/is-object');
const dictToQueryString = require('../helper/dict-to-query-string');
const parseQueryString = require('../helper/parse-query-string');

const DATA = Symbol('data');


class RequestOptions {
    constructor(path, method, headers, body, files) {
        method = method.toUpperCase();

        if (method === 'GET') {
            if (isObject(body)) {
                if (path.includes('?')) {
                    path = path.split('?');

                    body = Object.assign(
                        parseQueryString(path.pop()),
                        body
                    );

                    path = path.join('');
                }

                path += '?' + dictToQueryString(body);
            }

            body = {};
        }

        this[DATA] = {
            path, method, headers, body, files
        }
    }

    get path() {
        return this[DATA].path;
    }

    get body() {
        return this[DATA].body || '';
    }

    get files() {
        return this[DATA].files || '';
    }

    get headers() {
        return this[DATA].headers;
    }

    get method() {
        return this[DATA].method;
    }
}

module.exports = RequestOptions;