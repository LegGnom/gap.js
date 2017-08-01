"use strict";

const App = require('../app');
const resolvePath = require('./resolve-path');
const Logger = require('../logger');
const FileStorage = require('../file-storage');

const fs = require('fs');

const logger = new Logger('File: ');

const File = {
    exist(path) {
        return fs.existsSync(resolvePath(path));
    },

    stream(path) {
        return fs.createReadStream(resolvePath(path));
    },

    read(path, handler) {
        return new Promise(function (resolve) {
            let file = new FileStorage(path);

            file.read(function (err, data) {
                resolve(
                    handler.apply(file, [err, data, file])
                );
            })
        }).catch(err => {
            App.emit('error', err.stack);
        });
    }
};


module.exports = File;