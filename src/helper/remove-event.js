"use strict";

const each = require('./each');

/**
 * Удаление событий
 * @param node_list
 * @param event_name
 * @param handler
 */
module.exports = function removeEvent(node_list, event_name, handler) {
    if (node_list instanceof HTMLElement) {
        node_list = [node_list];
    }

    each(node_list, function (node) {
        node.removeEventListener(event_name, handler);
    });
};