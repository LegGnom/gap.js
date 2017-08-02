"use strict";

module.exports = function getComponent(node, component_name=false) {
    let component = null;
    let component_list = node.__components__ || [];

    each(component_list, item => {
        if (item.constructor.name === component_name) {
            component = item;
            return false;
        }
    });

    return component;
};