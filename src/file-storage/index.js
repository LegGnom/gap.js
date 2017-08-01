"use strict";

const fs = require('fs');
const path = require('path');
const url = require('url');
const mime = require('mime-types');

const App = require('../app');
const isFunction = require('../helper/is-function');
const Logger = require('../logger');


const FILE_PATH = Symbol('file path');
const FILE_PARAMS = Symbol('file params');

const logger = new Logger('FileStorage: ');


class FileStorage {
    constructor(file_path, default_name) {
        let params = path.parse(file_path);
        this[FILE_PATH] = file_path;
        this[FILE_PARAMS] = Object.assign(params, {
            base: default_name,
            mime_type: mime.lookup(path.parse(file_path).ext)
        });
    }

    get fileName() {
        return this[FILE_PARAMS].base;
    }

    contentLength() {

    }

    contentType() {

    }

    mimeType() {
        return this[FILE_PARAMS].mime_type;
    }

    save() {

    }

    exist() {
        return fs.existsSync(this[FILE_PATH]);
    }

    read(handler) {
        if (isFunction(handler)) {
            if (this.exist()) {
                fs.readFile(this[FILE_PATH], function (err, data) {
                    if (err) {
                        App.emit('error', err.stack);
                    }

                    handler(err, data);
                });
            } else {
                App.emit('error', new Error('File not found').stack);
            }
        } else {
            App.emit('warning', 'Handler not specified');
        }

        return this;
    }

    stream() {
        // return fs.file
    }
}


module.exports = FileStorage;