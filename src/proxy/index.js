"use strict";

const Router = require('../router');
const Request = require('../request');

const each = require('../helper/each');
const file = require('../helper/file');
const url = require('url');


class Proxy {
    constructor() {

    }

    set(from, to) {

        let url_options = url.parse(to);

        Router.any(from, function (request, response) {
            let path = Router.resolve(to, url_options.path.replace(from, ''));

            delete request.headers['content-length'];
            delete request.headers['content-type'];

            path = url_options.protocol + url_options.host + path;

            response.wait(
                Request[request.method.toLocaleLowerCase()](
                    path,
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