"use strict";

const App = require('../app');
const each = require('../helper/each');


module.exports = {
    get_components_by_name(env, name) {
        let result_component_list = [];

        if (!env || !env.length) {
            return result_component_list;
        }

        if (!name) {
            return env[0];
        }

        each(env, parent => {
            each(parent, component => {
                if (component.constructor.name === name) {
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


    run_component(component_name, parent, options=[]) {
        let component = App.getComponent(component_name);
        if (component) {
            return new component(parent, ...options);
        }
    },


    get_node_component(element) {
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