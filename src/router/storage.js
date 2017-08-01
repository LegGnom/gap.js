"use strict";

const isNumber = require("../helper/is-number");
const isString = require("../helper/is-string");
const Config = require("../config");
const clearSlashes = require("../helper/clear-slashes");
const each = require("../helper/each");


const STORAGE = Symbol("storage");
const MAKE = Symbol("make");
const CHECK_SLASHES = Symbol("check slashes");
const TEST_PARTS = Symbol("test parts");
const TEST_TYPES = Symbol("test types");

const URL_PARAM_REGEXP = new RegExp('<(.*)>', 'i');


class RouterStorage {
    constructor() {
        this[STORAGE] = {}
    }


    set(key, handler, methods) {
        let key_name = key;
        let is_regexp = false;

        if (key instanceof RegExp) {
            key_name = key.toString();
            is_regexp = true;
        }

        if (!this[STORAGE][key_name]) {
            let parts;

            if (!is_regexp) {
                parts = this[MAKE](key)
            }

            this[STORAGE][key_name] = {
                is_regexp: is_regexp,
                route: key,
                parts: parts,
                handlers: [],
                methods: methods
            }
        }

        this[STORAGE][key_name].handlers.push(handler);
    }


    search(url) {
        let test_part = this[MAKE](
            url.split('?').shift()
        );
        let result = [];

        each(Object.keys(this[STORAGE]), key => {
            let part = this[STORAGE][key];

            if (part.is_regexp) {
                if (part.route.test(url)) {
                    result.push({
                        data: part,
                        params: Array.prototype.slice.call(url.match(part.route)),
                        handlers: part.handlers
                    });
                }
            } else {
                let params = this[TEST_PARTS](part, test_part);
                if (params) {
                    result.push({
                        data: part,
                        params: params,
                        handlers: part.handlers
                    });
                }
            }
        });

        return result;
    }


    [TEST_PARTS](part, test_parts) {
        let result = false;

        if (part.parts.length === test_parts.length) {
            result = {};

            each(part.parts, (route_part, index) => {
                if (route_part.variable) {
                    if (!this[TEST_TYPES](route_part.type, test_parts[index].base)) {
                        return result = false;
                    }

                    result[route_part.variable] = test_parts[index].base;

                } else {
                    if (route_part.base !== test_parts[index].base) {
                        return result = false;
                    }
                }
            });
        }

        return result;
    }


    [MAKE](path) {
        let parts = [];
        path = this[CHECK_SLASHES](path);

        each(path.split('/'), item => {
            let variable;
            let type;

            if (item.match(URL_PARAM_REGEXP)) {
                variable = item.replace(/[<>\n]/g, '');
                variable = variable.split(':');
                type = variable[1];
                variable = variable[0];
            }

            parts.push({
                base: item,
                variable: variable,
                type: type
            })
        });

        return parts;
    }


    [CHECK_SLASHES](path) {
        let last_slash = '';

        if (Config.get('last_slashes') && path.substr(-1) === '/') {
            last_slash = '/';
        }

        return clearSlashes(path) + last_slash;
    }


    [TEST_TYPES](type, value) {
        switch (type) {
            case 'string':
                return !isNumber(value) && isString(value);
                break;

            case 'number':
                return isNumber(value);
                break;

            default:
                return Boolean(value);
        }
    }
}


module.exports = new RouterStorage();