"use strict";

const Router = require('../router');
const Request = require('../request');

const each = require('../helper/each');
const file = require('../helper/file');


class Proxy {
    constructor() {

    }

    set(from, to) {
        Router.any(from, function (request, response) {
            delete request.headers['content-length'];
            delete request.headers['content-type'];

            to += request.url.replace(from, '');

            response.wait(
                Request[request.method.toLocaleLowerCase()](
                    to,
                    Object.assign(
                        request.query.source,
                        request.form.source,
                        request.files.map((value, name) => {
                            return value.map(item => {
                                return file.stream(item.path)
                            });
                        })
                    ),
                    request.headers
                ).then(res => {
                    if (res.getHeaders()) {
                        response.setHeaders(res.getHeaders());
                    }

                    response.setBody(res.body);

                }).catch(err => {
                    response.setBody(err);
                })
            ).send();
        });
    }
}


module.exports = new Proxy;