"use strict";

const isFunction = require('../helper/is-function');
const execGenerator = require('../helper/exec-generator');

const HTTP_RESPONSE = Symbol('http response');
const HTTP_REQUEST = Symbol('http request');


class Controller {
    constructor(http_request, http_response) {
        this[HTTP_REQUEST] = http_request;
        this[HTTP_RESPONSE] = http_response;

        setTimeout(() => {
            switch (http_request.method) {
                case 'GET':
                    if (isFunction(this.get)) {
                        execGenerator(
                            this.get(http_request, http_response)
                        );
                    }
                    break;

                case 'POST':
                    if (isFunction(this.post)) {
                        execGenerator(
                            this.post(http_request, http_response)
                        );
                    }
                    break;

                case 'PUT':
                    if (isFunction(this.put)) {
                        execGenerator(
                            this.put(http_request, http_response)
                        );
                    }
                    break;

                case 'DELETE':
                    if (isFunction(this.delete)) {
                        execGenerator(
                            this.delete(http_request, http_response)
                        );
                    }
                    break;

                case 'PATCH':
                    if (isFunction(this.patch)) {
                        execGenerator(
                            this.patch(http_request, http_response)
                        );
                    }
                    break;
            }
        }, 0);
    }

    getRequest() {
        return this[HTTP_REQUEST];
    }

    getResponse() {
        return this[HTTP_RESPONSE];
    }

    wait(...promise) {
        this[HTTP_RESPONSE].wait.apply(this[HTTP_RESPONSE], arguments);
        return this;
    }

    then(handler) {
        this[HTTP_RESPONSE].then.apply(this[HTTP_RESPONSE], arguments);
        return this;
    }

    catch(handler) {
        this[HTTP_RESPONSE].catch.apply(this[HTTP_RESPONSE], arguments);
        return this;
    }

    get promise() {
        return this[HTTP_RESPONSE].promise.apply(this[HTTP_RESPONSE], arguments);
    }

    render(template, context) {
        this[HTTP_RESPONSE].render.apply(this[HTTP_RESPONSE], arguments);
    }

    renderString(template_string, context) {
        this[HTTP_RESPONSE].renderString.apply(this[HTTP_RESPONSE], arguments);
    }

    setCharset(charset) {
        this[HTTP_RESPONSE].setCharset.apply(this[HTTP_RESPONSE], arguments);
    }

    send(body, code) {
        this[HTTP_RESPONSE].send.apply(this[HTTP_RESPONSE], arguments);
    }

    abort(body, code) {
        this[HTTP_RESPONSE].abort.apply(this[HTTP_RESPONSE], arguments);
    }

    json(data, code) {
        this[HTTP_RESPONSE].json.apply(this[HTTP_RESPONSE], arguments);
    }

    redirect(path, code) {
        this[HTTP_RESPONSE].redirect.apply(this[HTTP_RESPONSE], arguments);
    }

    getBody() {
        return this[HTTP_RESPONSE].getBody.apply(this[HTTP_RESPONSE], arguments);
    }

    setBody(body) {
        this[HTTP_RESPONSE].setBody.apply(this[HTTP_RESPONSE], arguments);
    }

    setCookie(name, value, expires=false, path='/', domain=false) {
        this[HTTP_RESPONSE].setCookie.apply(this[HTTP_RESPONSE], arguments);
    }

    removeHeader(name) {
        this[HTTP_RESPONSE].removeHeader.apply(this[HTTP_RESPONSE], arguments);
    }

    setHeader(name, value) {
        this[HTTP_RESPONSE].setHeader.apply(this[HTTP_RESPONSE], arguments);
    }

    getHeader(name, _default) {
        return this[HTTP_RESPONSE].getHeader.apply(this[HTTP_RESPONSE], arguments);
    }

    getCookie(cookie_name, _default) {
        return this[HTTP_REQUEST].getCookie.apply(this[HTTP_REQUEST], arguments);
    }

    getCookies() {
        return this[HTTP_REQUEST].cookies;
    }

    setHeaders(headers) {
        this[HTTP_RESPONSE].setHeaders.apply(this[HTTP_RESPONSE], arguments);
    }

    getHeaders() {
        return this[HTTP_RESPONSE].getHeaders.apply(this[HTTP_RESPONSE], arguments);
    }

    setStatus(status) {
        this[HTTP_RESPONSE].setStatus.apply(this[HTTP_RESPONSE], arguments);
    }

    getStatus() {
        return this[HTTP_RESPONSE].getStatus.apply(this[HTTP_RESPONSE], arguments);
    }

    getStatusMessage() {
        return this[HTTP_RESPONSE].getStatusMessage.apply(this[HTTP_RESPONSE], arguments);
    }
}


module.exports = Controller;