"use strict";

const RouterGroup = require("./group");
const RouterManager = require("./manager");
const ErrorHandler = require('./error_handler');


class Router extends RouterManager {
    constructor() {
        super();
    }


    group(name, manager) {
        return new RouterGroup(...arguments);
    }

    error(handler) {
        ErrorHandler.set(handler);
    }
}


module.exports = new Router();