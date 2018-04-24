"use strict";

const App = require('../app');
const isArray = require('../helper/is-array');
const each = require('../helper/each');


module.exports = {
    getComponentsByName(env, name) {
        let result_component_list = [];

        if (!env || !env.length) {
            return result_component_list;
        }

        if (!name) {
            return env[0];
        }

        each(env, parent => {
            each(parent, component => {
                if (component.constructor.component_name === name) {
                    result_component_list.push(component);
                }
            });
        });

        return result_component_list;
    },

    parents(node) {
        let selector = '.component';
        let result = [];

        node = node.parentElement;
        while(node) {
            if (node.matches(selector)) {
                result.push(node.__components__ || []);
            }

            node = node.parentElement;
        }

        return result
    },


    find(node) {
        let result = [];

        each(node.querySelectorAll('.component'), node => {
            result.push(node.__components__ || []);
        });

        return result;
    },


    runComponent(component_name, parent, options=[]) {
        let component = App.getComponent(component_name);

        if (!isArray(options)) {
            throw 'Component options must be an array';
        }

        if (component) {
            return new component(parent, ...options);
        }
    },


    getNodeComponent(element) {
        let el = element;
        while(el) {
            if (el && el.tagName !== 'SCRIPT') {
                return el;
            }

            el = el.previousElementSibling;
        }
        return element.parentNode;
    }
};