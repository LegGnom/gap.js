"use strict";

const dom = require('../dom');


module.exports = function historyTarget(event) {
    let a = dom.closest(event.target, 'a');

    if (!a) {
        return;
    }

    if (window.location.host !== a.host) {
        return;
    }

    if (a.hasAttribute('native')) {
        return;
    }

    if (a.hasAttribute('target') && ['_blank', '_parent', '_top'].includes(a.getAttribute('target'))) {
        return;
    }

    if (event.metaKey || event.button !== 0) {
        return;
    }

    event.preventDefault();
    history.pushState(null, null, a.getAttribute('href'));
};