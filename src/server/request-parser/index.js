"use strict";

const EventEmitter = require('../../event-emitter');
const App = require('../../app');
const toJSON = require('../../helper/to-json');
const parseQueryString = require('../../helper/parse-query-string');

const multiparty = require('multiparty');

const PARSE = Symbol('parse');

const CONTENT_TYPE_RE = /^multipart\/(?:form-data|related)(?:;|$)/i;


class RequestParser extends EventEmitter {
    constructor(request) {
        super();

        let headers = toJSON(JSON.stringify(request.headers));
        let content_type = headers['content-type'] || '';

        if (
            CONTENT_TYPE_RE.test(content_type)
            && request.method !== 'GET'
            && (request.headers['content-length'] * 1)
        ) {

            let form = new multiparty.Form();

            form.parse(request, (err, fields, files) => {
                if (err) {
                    App.emit('error', err.stack);
                }

                this.emit('end', err, fields, files)
            });
        } else {
            this[PARSE](request, content_type);
        }
    }

    [PARSE](request, content_type) {
        let body = [];
        let err = null;
        let fields = {};
        let files = {};

        request.on('error', err => {
            App.emit('error', err.stack);
            this.emit('error', err);
        });

        request.on('data', chunk => {
            body.push(chunk);
        });

        request.once('end', () => {
            if (body.length) {
                body = Buffer.concat(body).toString();

                if (content_type.includes('x-www-form-urlencoded')) {
                    fields = parseQueryString(body);
                } else if (content_type.includes('json')) {
                    fields = toJSON(body)
                }
            }
            this.emit('end', err, fields, files);
        });
    }
}


module.exports = RequestParser;