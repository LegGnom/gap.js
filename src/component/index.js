"use strict"

const Middleware = require('./middleware');
const App = require('../app');
const toJSON = require('../helper/to-json');
const each = require('../helper/each');
const helpers = require('./helpers');

const CHILDREN_LIST = Symbol('children list');
const PARENT_LIST = Symbol('parent list');


class Component extends Middleware {

    constructor(node, state) {
        super(state);

        this[CHILDREN_LIST] = null;
        this[PARENT_LIST] = null;

        this.setComponent(node);

        this.node = node;
    }


    render(template, context, node) {
        let result = '';

        if (template) {
            result = template.render ? template.render(context) : template(context);
        }

        if (node) {
            node.innerHTML = result;
            Component.load(node);
        }

        return result;
    }


    getParents(name) {
        if (this.node && !this[PARENT_LIST]) {
            this[PARENT_LIST] = helpers.parents(this.node);
        }

        if (name) {
            return helpers.getComponentsByName(this[PARENT_LIST], name);
        }

        return this[PARENT_LIST];
    }


    getParent(name) {
        return this.getParents(name)[0];
    }


    getChildrens(name) {
        if (this.node && !this[CHILDREN_LIST]) {
            this[CHILDREN_LIST] = helpers.find(this.node);
        }

        if (name) {
            return helpers.getComponentsByName(this[CHILDREN_LIST], name);
        }
        return this[CHILDREN_LIST];
    }


    getChildren(name) {
        return this.getChildrens(name)[0];
    }


    setComponent(node) {
        if (node) {
            if (!node.__components__) {
                node.classList.add('component');
                node.__components__ = [];
            }

            node.__components__.push(this);
        }
    }


    static create(name, _class) {
        _class.component_name = name;
        App.addComponent(name, _class);
        return _class;
    }

    static load(parent=document.body) {
        let end = null;
        let wait_all_component = new Promise(function(resolve, reject){
            end = resolve;
        });

        each(App.getComponents(), instance => {
            if (instance.query) {
                each(parent.querySelectorAll(instance.query()), node => {
                    let component = new instance(node);

                    if (component && component.wait) {
                        component.wait(wait_all_component);
                    }
                });
            }
        });

        each(parent.querySelectorAll('[data-component]'), item => {
            if (!item.getAttribute('data-run')) {
                let name = item.getAttribute('data-component');
                let parent = helpers.getNodeComponent(item);
                let options = item.innerHTML;
                let component;

                options = options.replace(/&gt;/g, '>');
                options = options.replace(/&lt;/g, '<');
                options = toJSON(options) || [];

                item.setAttribute('data-run', '1');
                component = helpers.runComponent(name, parent, options);

                if (component && component.wait) {
                    component.wait(wait_all_component);
                }
            }
        });

        end();
    }
}


module.exports = Component;