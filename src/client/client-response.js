"use strict";

const libHTTP = require('../http');
const REDIRECT_STATUS_LIST = [301, 302, 303, 305, 307];



module.exports = function(request) {
    return new libHTTP.Response({
        headers: {},

        status: 200,

        writeHead(status, headers) {
            this.headers = headers;
            this.status = status;

            if (REDIRECT_STATUS_LIST.includes(status)) {
                window.location = headers.location;
            }
        },

        end(body) {
            let dom;

            if (!body) {
                return;
            }

            if (REDIRECT_STATUS_LIST.includes(this.status)) {
                return;
            }

            dom = document.createElement('HTML');
            dom.innerHTML = body;

            document.replaceChild(dom, document.documentElement);
        }
    }, request);
};