"use strict";

const isNode = require('../helper/is-node');


const CoreLogger = {
    TYPES: {
        MESSAGE: 'log',
        WARNING: 'warning',
        ERROR: 'error'
    },

    RESET: "\x1b[0m",

    STYLE: {
        BRIGHT: "\x1b[1m",
        DIM: "\x1b[2m",
        UNDERSCORE: "\x1b[4m",
        BLINK: "\x1b[5m",
        REVERSE: "\x1b[7m",
        HIDDEN: "\x1b[8m"
    },


    COLOR: {
        BLACK: "\x1b[30m",
        RED: "\x1b[31m",
        GREEN: "\x1b[32m",
        YELLOW: "\x1b[33m",
        BLUE: "\x1b[34m",
        MAGENTA: "\x1b[35m",
        CYAN: "\x1b[36m",
        WHITE: "\x1b[37m"
    },


    BACKGROUND: {
        BLACK: "\x1b[40m",
        RED: "\x1b[41m",
        GREEN: "\x1b[42m",
        YELLOW: "\x1b[43m",
        BLUE: "\x1b[44m",
        MAGENTA: "\x1b[45m",
        CYAN: "\x1b[46m",
        WHITE: "\x1b[47m"
    },
    


    error(...message) {
        this.send(this.TYPES.ERROR, ...message.map(item => {
            return this.style(item, this.COLOR.RED);
        }));
    },


    warning(...message) {
        this.send(this.TYPES.WARNING, ...message.map(item => {
            return this.style(item, this.COLOR.YELLOW);
        }));
    },


    log(...message) {
        this.send(this.TYPES.MESSAGE, ...message);
    },


    make(...msg) {
        return msg.join('\n');
    },


    style(string, color='', background='', style='') {
        if (isNode()) {
            return [background, color, style, string, this.RESET].join('');
        }

        return string;
    },


    send(type, ...message) {
        console[type](this.make(...message));
    }
};


module.exports = CoreLogger;