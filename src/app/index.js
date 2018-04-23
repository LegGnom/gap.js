"use strict";

const EventEmitter = require('../event-emitter');
const Logger = require('../logger');

const logger = new Logger();

const COMPONENT_COLLECTION = Symbol('component collection');
const TEMPLATE_ENGINE = Symbol('template engine');


class App extends EventEmitter {
    constructor() {
        super();

        this[COMPONENT_COLLECTION] = new Map();
        this[TEMPLATE_ENGINE] = null;

        this.on('error', message => logger.error(message));
        this.on('warning', message => logger.warning(message));
    }

    addComponent(name, _class) {
        this[COMPONENT_COLLECTION].set(name, _class);
    }

    getComponents() {
        return this[COMPONENT_COLLECTION];
    }

    getComponent(name) {
        return this[COMPONENT_COLLECTION].get(name);
    }

    removeComponent(name) {
        delete this[COMPONENT_COLLECTION].delete(name);
    }

    getTemplateEngine() {
        return this[TEMPLATE_ENGINE];
    }

    setTemplateEngine(engine) {
        this[TEMPLATE_ENGINE] = engine;
    }
}


module.exports = new App;