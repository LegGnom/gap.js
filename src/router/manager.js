const RouterStorage = require("./storage");
const isString = require("../helper/is-string");
const isArray = require("../helper/is-array");
const clearSlashes = require("../helper/clear-slashes");


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


    [MERGE_ROUTE_HANDLER](key) {
        let prefix = this[ROUTE_MANAGER_PREFIX];

        if (prefix) {
            if (isString(key) && isString(prefix)) {
                key = prefix + clearSlashes(key) + (key.substr(-1) === '/' ? '/' : '');
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