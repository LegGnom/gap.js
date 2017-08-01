"use strict";

const Config = require('../../config');
const isArray = require('../../helper/is-array');
const isFunction = require('../../helper/is-function');
const each = require('../../helper/each');
const clearSlashes = require('../../helper/clear-slashes');
const file = require('../../helper/file');
const mime = require('mime-types')



const ServerStatic = {
    check(req, res) {
        let folders = Config.get('static_folder');
        let url = clearSlashes(req.url);
        let isStatic = false;

        if (req.method !== 'GET') {
            return isStatic;
        }

        folders = isArray(folders) ? folders : [folders];

        each(folders, uri => {
            let file_path = '';
            uri = clearSlashes(uri);

            if (url.indexOf(uri) === 0) {
                isStatic = true;

                if (isFunction(uri)) {
                    file_path = uri(url);
                } else {
                    file_path = url;
                }

                file_path = clearSlashes(file_path);

                if (file.exist(file_path)) {
                    res.writeHeader(200, {
                        'Content-Type': mime.lookup(file_path)
                    });
                    file.stream(file_path).pipe(res);
                } else {
                    res.writeHeader(404);
                    res.end('File not found!');
                }
            }
        });

        return isStatic;
    }
};

module.exports = ServerStatic;