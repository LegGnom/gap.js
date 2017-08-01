"use strict";

const Component = require('../component');

class Client {

    constructor() {

    }

    run() {
        Component.load();
    }


}

module.exports = new Client();