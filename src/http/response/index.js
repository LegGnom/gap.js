"use strict";

const Wait = require('../../wait');
const RouterErrorHandler = require('../../router/error_handler');
const RequestResult = require('../../request/request-result');
const isString = require('../../helper/is-string');
const isFunction = require('../../helper/is-function');
const dictToStringJSON = require('../../helper/dict-to-string-json');
const each = require('../../helper/each');
const App = require('../../app');
const Logger = require('../../logger');

const HTTPStatus = require('http-status');


const HTTP_RESPONSE = Symbol('http response');
const SYSTEM_REQUEST = Symbol('system request');
const RESPONSE_DATA = Symbol('response data');
const HTTP_END_HANDLER = Symbol('http end handler');

const logger = new Logger('Response: ');


class Response extends Wait {
    constructor(http_response, http_request) {
        super();

        this[HTTP_RESPONSE] = http_response;
        this[SYSTEM_REQUEST] = http_request;

        this[RESPONSE_DATA] = {
            body: '',
            code: 200,
            headers: {
                'content-type': 'text/html',
                'accept-ranges': 'bytes',
                'cache-control': 'no-cache'
            }
        };
    }

    abort(body, code=404) {
        this.setStatus(code);
        this.setBody(body);
        RouterErrorHandler.run(this[SYSTEM_REQUEST], this);
    }


    send(body, code=this.getStatus()) {
        if (code < this.getStatus()) {
            return;
        }

        this.setBody(body);
        this.setStatus(code);

        this[HTTP_END_HANDLER]();
    }


    render(template, context={}, code=200) {
        this.send(
            (request_context) => {
                return App.getTemplateEngine().render.apply(
                    App.getTemplateEngine(),
                    [template, Object.assign({}, request_context, context)]
                )
            },
            code
        )
    }


    renderString(template, context={}, code=200) {
        this.send(
            (request_context) => {
                return App.getTemplateEngine().renderString.apply(
                    App.getTemplateEngine(),
                    [template, Object.assign({}, request_context, context)]
                )
            },
            code
        );
    }


    json(data, code=200) {
        this.setHeader('content-type', 'application/json; charset=utf-8');
        this.send(dictToStringJSON(data), code);
    }


    setCharset(charset) {
        this[HTTP_RESPONSE].charset = charset;
    }


    redirect(path, code=301) {
        let access_code = [301, 302, 303, 305, 307];

        if (!access_code.includes(code)) {
            throw 'Redirect error code: ' + code + ' is not supported';
        }

        this.setHeaders({
            'Location': path,
            'mimetype': 'text/html'
        });

        this.send([
            '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">\n',
            '<title>Redirecting...</title>\n',
            '<h1>Redirecting...</h1>\n',
            '<p>You should be redirected automatically to target URL: ',
            '<a href="%s">%s</a>.  If not click the link.'
        ].join('').replace(/%s/, path), code);
    }


    getBody() {
        return this[RESPONSE_DATA].body;
    }

    setBody(body) {
        this[RESPONSE_DATA].body = body;
    }


    removeHeader(name) {
        delete this[RESPONSE_DATA].headers[name.toLowerCase()];
    }


    setHeader(name, value) {
        this[RESPONSE_DATA].headers[name.toLowerCase()] = value;
    }


    getHeader(name, _default) {
        return this[RESPONSE_DATA].headers[name.toLowerCase()] || _default;
    }

    setHeaders(headers) {
        let _headers = {};
        each(Object.keys(headers), item => {
            _headers[item.toLowerCase()] = headers[item];
        });
        this[RESPONSE_DATA].headers = _headers;
    }

    setCookie(name, value, expires=false, path='/', domain=false) {
        let cookies = this[RESPONSE_DATA].headers['Set-Cookie'] || [];
        let data = `${name}=${value}`;

        if (expires) {
            data += `; Expires=${expires}`;
        }

        if (path) {
            data += `; Path=${path}`;
        }

        if (domain) {
            data += `; Domain=${domain}`;
        }

        cookies.push(data);

        this[RESPONSE_DATA].headers['Set-Cookie'] = data;
    }

    getHeaders() {
        return this[RESPONSE_DATA].headers;
    }

    setStatus(status) {
        this[RESPONSE_DATA].code = status;
    }

    getStatus() {
        return this[RESPONSE_DATA].code || 200;
    }

    getStatusMessage() {
        return HTTPStatus[this.getStatus()] || '';
    }

    [HTTP_END_HANDLER]() {
        this.finally(response => {
            let body = this.getBody();
            let request_context = {};

            if (isFunction(body)) {
                each(response, item => {
                    Object.assign(
                        request_context,
                        item instanceof RequestResult ? item.json : item
                    );
                });

                body = body(request_context);
            }

            if (!(body instanceof Buffer)) {
                if (!isString(body)) {
                    try {
                        body = JSON.stringify(body);
                    } catch (e) {
                        throw "Not supported data format";
                    }
                }
            }

            this[HTTP_RESPONSE].writeHead(this.getStatus(), this.getHeaders());
            this[HTTP_RESPONSE].end(body);
        }).catch(err => {
            App.emit('error', err.stack);

            this[HTTP_RESPONSE].writeHead(500, {});
            this[HTTP_RESPONSE].end(err);
        });
    }
}


module.exports = Response;