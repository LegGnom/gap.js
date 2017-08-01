"use strict";

const CoreLogger = require('./logger');
const isArray = require('../helper/is-array');
const sprintf = require('sprintf-js').sprintf;
const Config = require('../config');


function log (type, code, message, options=[]) {
    let loggerAccess = Config.get('logger') || [];

    if (Config.get('debug') || code === Logger.code.ERROR) {

        if (!isArray(loggerAccess)) {
            loggerAccess = [loggerAccess]
        }

        if (!loggerAccess.includes(code)) {
            return;
        }

        CoreLogger[type](
            sprintf(this[LOGGER_PREFIX] + message, ...options)
        );
    }
}


const LOGGER_LEVEL = Symbol('level');
const LOGGER_PREFIX = Symbol('prefix');


class Logger {
    static get code() {
        return {
            MESSAGE: 0,
            DEBUG: 1,
            INFO: 2,
            WARNING: 3,
            ERROR: 4
        };
    }

    constructor(prefix = '', level = Logger.code.MESSAGE) {
        this[LOGGER_PREFIX] = prefix;

        this.level(level);
    }

    level(level) {
        if (level !== undefined) {
            this[LOGGER_LEVEL] = level;
        }
        return this[LOGGER_LEVEL];
    }

    debug(message, ...options) {
        log.call(this, CoreLogger.TYPES.MESSAGE, Logger.code.DEBUG, ...arguments);
        return this;
    }

    info(message, ...options) {
        log.call(this, CoreLogger.TYPES.MESSAGE, Logger.code.INFO, ...arguments);
        return this;
    }

    warning(message, ...options) {
        log.call(this, CoreLogger.TYPES.WARNING, Logger.code.WARNING, ...arguments);
        return this;
    }

    error(message, ...options) {
        log.call(this, CoreLogger.TYPES.ERROR, Logger.code.ERROR, ...arguments);
        return this;
    }
};

module.exports = Logger;