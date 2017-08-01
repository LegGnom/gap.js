"use strict";


const http = require('http');
const https = require('https');
const url = require('url');

const App = require('../app');
const View = require('../view');
const Config = require("../config/index");
const Logger = require('../logger/index');
const lib_http = require('../http');
const make = require('../make');
const ServerStatic = require('./server-static');
const RequestParser = require('./request-parser');

const logger = new Logger('Server: ');


const SERVER_DRIVER = Symbol('driver')
const SERVER_DRIVER_INSTANCE = Symbol('driver instance');
const SERVER_HANDLER = Symbol('handler');
const TEMPLATE_ENGINE = Symbol('template engine');


const DRIVER = {
    http, https
};

require('./global-setting');


class Server {
    constructor() {
        this[TEMPLATE_ENGINE] = null;
        this[SERVER_DRIVER_INSTANCE] = null;
    }


    run(host, port, protocol) {
        host = host || Config.get('server.host');
        port = port || Config.get('server.port');
        protocol = protocol || Config.get('server.protocol');

        Config.set('server.host', host);
        Config.set('server.port', port);
        Config.set('server.protocol', protocol);

        logger.info('run %s://%s:%s/', [protocol, host, port]);

        App.setTemplateEngine(this.getTemplateEngine())
        this[SERVER_DRIVER](protocol).listen(port, host);
    }


    [SERVER_DRIVER](protocol) {
        if (this[SERVER_DRIVER_INSTANCE]) {
            return this[SERVER_DRIVER_INSTANCE];
        }

        return this[SERVER_DRIVER_INSTANCE] = DRIVER[protocol].createServer(
            this[SERVER_HANDLER].bind(this)
        );
    }


    [SERVER_HANDLER](req, res) {
        let form;
        logger.info('request %s', [req.url]);

        if (ServerStatic.check(req, res)) {
            return;
        }

        form = new RequestParser(req);

        form.on('end', (err, fields, files) => {
            let request = new lib_http.Request(req, fields, files);
            let response = new lib_http.Response(res, request);

            try {
                make(request, response);
            } catch (err) {
                response.abort(`<pre>${err.stack}</pre>`, 500);
            }
        });
    }

    getTemplateEngine() {
        if (!this[TEMPLATE_ENGINE]) {
            this[TEMPLATE_ENGINE] = new View();
        }

        return this[TEMPLATE_ENGINE];
    }

    setTemplateEngine(engine) {
        this[TEMPLATE_ENGINE] = engine;
    }
}


module.exports = new Server();