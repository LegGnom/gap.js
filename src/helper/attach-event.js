"use strict";

const each = require('./each');

/**
 * Обертка над addEventListener, принимает как одну так и список HTMLElements
 * @param node_list
 * @param event_name
 * @param handler
 */
module.exports = function attachEvent(node_list, event_name, handler) {
    if (node_list instanceof HTMLElement) {
        node_list = [node_list];
    }

    each(node_list, function (node) {
        node.addEventListener(event_name, handler);
    });
};