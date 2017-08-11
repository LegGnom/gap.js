"use strict";

const App = require('../app');
const isNode = require('../helper/is-node');
const RequestOptons = require('./request-options');


const PROXY_LIST = [];

let env;

if (isNode()) {
    env = require('./request-server');
} else {
    env = require('./request-client');
}



class Request {
    get(path, body, headers) {
        return this.send('GET', path, body, headers);
    }

    post(path, body, headers, files) {
        return this.send('POST', path, body, headers, files);
    }

    put(path, body, headers, files) {
        return this.send('PUT', path, body, headers, files);
    }

    delete(path, body, headers, files) {
        return this.send('DELETE', path, body, headers, files);
    }

    patch(path, body, headers, files) {
        return this.send('PATCH', path, body, headers, files);
    }

    send(method, path, body, headers, files) {
        let request = env(new RequestOptons(path, method, headers, body, files, PROXY_LIST));

        request.promise.xhr = request.xhr;
        request.promise.abort = request.xhr.abort.bind(request.xhr);

        request.promise.catch(err => {
            App.emit('error', err.stack);
            return err;
        });

        return request.promise;
    }

    setProxy(from, to) {
        PROXY_LIST.push([from, to]);
    }
}


module.exports = new Request;