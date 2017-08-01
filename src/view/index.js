"use strict";

const template_env = require('./nunjucks-envirement');
const resolvePath = require('../helper/resolve-path');
const isString = require('../helper/is-string');
const Config = require('../config');


class View {
    constructor() {
        this.env = template_env;
    }

    render(template, context) {
        if (isString(template)) {
            template = require(
                resolvePath(Config.get('view_path'), template)
            );
        }

        if (template) {
            return template.render ? template.render(context) : template(context);
        }

        return '';
    }


    renderString(template_string, context) {
        return this.env.renderString(template_string, context);
    }
}


module.exports = View;