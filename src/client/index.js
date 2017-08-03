"use strict";

const App = require('../app');
const Make = require('../make');
const Component = require('../component');
const EventEmitter = require('../event-emitter');
const clientRequest = require('./client-request');
const clientResponse = require('./client-response');

const historyTarget = require('./history-target');

let pathCursor = window.location.pathname;


App.setTemplateEngine({
    render(template, context) {
        return template.render(context);
    }
});

function check() {
    let req = clientRequest();
    Make(req, clientResponse(req));
}

class Client extends EventEmitter {

    constructor() {
        super();
    }

    run() {
        Component.load();
        check();
    }

    listen() {
        let pushState = history.pushState;

        this.run();

        history.pushState = function(state) {
            let ps = pushState.apply(history, arguments);
            if (typeof history.onpushstate === "function") {
                history.onpushstate({state: state});
            }
            return ps;
        };

        document.removeEventListener('click', historyTarget.bind(this));
        document.addEventListener('click', historyTarget.bind(this));

        window.onpopstate = history.onpushstate = function (data) {
            let path = window.location.pathname + window.location.search;
            let hash = window.location.hash;

            if (data.state && data.state.stopPropagation) {
                return;
            }

            if (hash) {
                App.emit('change_hash', [hash]);
                return;
            }

            if(path !== pathCursor) {
                pathCursor = path;
                App.emit('change_url', [path]);
                this.flush();
                this.run();
            }
        }.bind(this);

        return this;
    }


}

module.exports = new Client();