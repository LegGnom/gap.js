const RouterStorage = require("./storage");
const isString = require("../helper/is-string");
const isArray = require("../helper/is-array");
const clearSlashes = require("../helper/clear-slashes");
const each = require('../helper/each');


const ROUTE_MANAGER_PREFIX = Symbol('route manager prefix');
const MERGE_ROUTE_HANDLER = Symbol('merge route handler');


class RouterManager {
    constructor(prefix) {
        this[ROUTE_MANAGER_PREFIX] = prefix;
    }


    route(key, methods, handler) {
        if (!isArray(methods)) {
            throw "The variable methods must be an array";
        }

        RouterStorage.set(
            this[MERGE_ROUTE_HANDLER](key),
            handler,
            methods.join(',').toUpperCase().split(',')
        );

        return this;
    }

    any(key, handler) {
        RouterStorage.set(
            this[MERGE_ROUTE_HANDLER](key),
            handler
        );

        return this;
    }


    get(key, handler) {
        RouterStorage.set(
            this[MERGE_ROUTE_HANDLER](key),
            handler,
            ['GET']
        );

        return this;
    }

    post(key, handler) {
        RouterStorage.set(
            this[MERGE_ROUTE_HANDLER](key),
            handler,
            ['POST']
        );

        return this;
    }

    put(key, handler) {
        RouterStorage.set(
            this[MERGE_ROUTE_HANDLER](key),
            handler,
            ['PUT']
        );

        return this;
    }

    delete(key, handler) {
        RouterStorage.set(
            this[MERGE_ROUTE_HANDLER](key),
            handler,
            ['DELETE']
        );

        return this;
    }

    patch(key, handler) {
        RouterStorage.set(
            this[MERGE_ROUTE_HANDLER](key),
            handler,
            ['OPTIONS']
        );

        return this;
    }


    resolve(...paths) {
        let result = [];
        let is_first_slash;
        let is_last_slash;

        paths = paths.join('');

        is_first_slash = paths[0] === '/';
        is_last_slash = paths.substr(-1) === '/';

        each(paths.split('/'), item => {
            if (item) {
                result.push(item);
            }
        });

        if (is_last_slash) {
            result.push('');
        }

        if (is_first_slash) {
            result.unshift('');
        }

        return result.join('/');
    }


    [MERGE_ROUTE_HANDLER](key) {
        let prefix = this[ROUTE_MANAGER_PREFIX];

        if (prefix) {
            if (isString(key) && isString(prefix)) {
                return this.resolve(prefix, key);
            } else {
                let prefix = isString(prefix) ? new RegExp(prefix) : prefix;
                let key = isString(key) ? new RegExp(key) : key;

                return new RegExp(prefix + key);
            }
        }

        return key;
    }
}


module.exports = RouterManager;