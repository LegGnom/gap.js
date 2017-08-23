"use strict";

const RequestResult = require('./request-result');
const Config = require('../config');
const isArray = require('../helper/is-array');
const each = require('../helper/each');

const url = require('url');
const FormData = require('form-data');


module.exports = function requestServer(options) {
    let xhr;
    let uri = url.parse(options.path);
    let opt = {
        port: uri.port,
        path: uri.path,
        method: options.method || 'GET',
        headers: options.headers || {}
    };
    let form = new FormData;


    if (uri.hostname) {
        opt['host'] = uri.hostname;
    } else {
        opt['port'] = uri.port || Config.get('server.port')
    }

    each(Object.keys(options.body), key => {
        let value = options.body[key];
        if (isArray(value)) {
            each(value, item => {
                form.append(key, item);
            })
        } else {
            form.append(key, value);
        }
    });

    let promise = new Promise(function (resolve, reject) {
        xhr = form.submit(opt, function (err, res) {
            let response_body = [];

            if (err) {
                return reject(err);
            }

            res.setEncoding('utf8');

            res.on('data', function (data) {
                response_body.push(data);
            });

            res.on('error', reject);
            res.on('timeout', reject);

            res.on('end', function () {
                let body = response_body.join('');
                resolve(new RequestResult(xhr.res, body));
            });
        });
    });

    return {
        xhr: xhr,
        promise: promise
    };
};