"use strict";

const RequestResult = require('./request-result');
const isArray = require('../helper/is-array');
const each = require('../helper/each');


module.exports = function requestClient(options) {
    let XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    let xhr = new XHR();
    let body = options.body;
    let promise = new Promise(function (resolve, reject) {
        xhr.open(options.method, options.path);

        each(Object.keys(options.headers || {}), key => {
            xhr.setRequestHeader(key, options.headers[key]);
        });

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) {
                return;
            }

            if (xhr.status !== 200) {
                reject(xhr.responseText);
            } else {
                resolve(new RequestResult(xhr.response, xhr.responseText));
            }
        };

        xhr.send(body);
    });

    return {
        xhr: xhr,
        promise: promise
    };
};