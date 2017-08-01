"use strict";

const fs = require('fs');


require.extensions['.svg'] = function (module, filename) {
    module.exports = fs.readFileSync(module, 'utf8');
};