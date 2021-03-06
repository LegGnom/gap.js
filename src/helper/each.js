const is_iterator = require('./is-iterator');
const is_array = require('./is-array');

/**
 * Обертка над forEach
 * @param list
 * @param handler
 */
module.exports = function each(list, handler) {
    if (!list) {
        return;
    }

    if (is_iterator(list)) {
        for (let [key, value] of list) {
            handler(value, key);
        }

    } else {
        if (!is_array(list)) {
            list = Array.prototype.slice.call(list);
        }

        for (let i = 0; i < list.length; i++) {
            if (handler(list[i], i) === false) {
                break;
            }
        }
    }
};