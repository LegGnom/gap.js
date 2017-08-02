"use strict";

const parseQueryString = require('../../helper/parse-query-string');
const each = require('../../helper/each');
const RequestCollection = require('./request-collection');

const HTTP_REQUEST = Symbol('http request');
const HTTP_DATA = Symbol('http data');
const COOKIES = Symbol('cookies');
const PARSE_COOKIES_HANDLER = Symbol('parse cookies handler');


class Request {
    constructor(http_request, fields, files, params) {
        this[HTTP_REQUEST] = http_request;

        this[COOKIES] = this[PARSE_COOKIES_HANDLER]();

        this[HTTP_DATA] = {
            params: new RequestCollection(params),
            files: new RequestCollection(files),
            fields: new RequestCollection(fields),
            query: null
        };
    }


    get method() {
        return this[HTTP_REQUEST].method;
    }

    get url() {
        return this[HTTP_REQUEST].url;
    }

    get headers() {
        return this[HTTP_REQUEST].headers;
    }

    get cookies() {
        return this[COOKIES];
    }

    getCookie(cookie_name, _default) {
        return this[COOKIES][cookie_name] || _default;
    }

    get params() {
        return this[HTTP_DATA].params;
    }

    create(http_request=null, fields=null, files=null, params=null) {
        return new Request(
            http_request || this[HTTP_REQUEST],
            fields || this[HTTP_DATA].fields,
            files || this[HTTP_DATA].files,
            params || this[HTTP_DATA].params
        );
    }

    get query() {
        if (!this[HTTP_DATA].query) {
            this[HTTP_DATA].query = new RequestCollection(
                parseQueryString(
                    this.url.split('?')[1]
                )
            );
        }

        return this[HTTP_DATA].query;
    }

    get form() {
        return this[HTTP_DATA].fields;
    }

    get files() {
        return this[HTTP_DATA].files;
    }

    get bodyLength() {
        return this[HTTP_BODY].length;
    }

    [PARSE_COOKIES_HANDLER]() {
        let cookies = {};

        if (this[HTTP_REQUEST].headers.cookie) {
            each(this[HTTP_REQUEST].headers.cookie.split(';'), item => {
                let [key, value] = item.split('=');
                cookies[key.trim()] = value.trim();
            });
        }

        return cookies;
    }
}


module.exports = Request;