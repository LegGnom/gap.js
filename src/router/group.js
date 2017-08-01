const RouterManager = require('./manager');
const isObject = require('../helper/is-object');
const isFunction = require('../helper/is-function');
const each = require('../helper/each');


const ROUTER_GORUP_NAME = Symbol('name');


class RouterGroup extends RouterManager {

    constructor(name, manager) {
        super(name);

        this[ROUTER_GORUP_NAME] = name;


        if (isObject(manager)) {
            each(Object.keys(manager), key => {
                this.any(key, manager[key]);
            });

        } else if(isFunction(manager)) {
            manager.call(this, this);
        }
    }


    handler(handler) {
        this.any(this[ROUTER_GORUP_NAME], handler);
        return this;
    }
}


module.exports = RouterGroup;