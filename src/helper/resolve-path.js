"use strict";

const Config = require('../config');
const path = require('path');


module.exports = function resolvePath(...uri_list) {
    let appDir = path.dirname(require.main.filename);
    return path.resolve(appDir, Config.get('base_dir'), ...uri_list);
};