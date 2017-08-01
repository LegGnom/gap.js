"use strict";

const each = require('./each');


module.exports = class DataForm {
    constructor(node) {
        this._ns = [];
        this._data = [];

        each(node.querySelectorAll('input, select, textarea'), item => {
            let {name, value} = item;

            if (name) {
                if (item.type === 'file') {
                    each(item.files, file => {
                        this.append(name, file);
                    });
                } else {
                    if (['checkbox', 'radio'].includes(item.type.toLowerCase())) {
                        if (item.checked) {
                            this.append(name, value);
                        }
                    } else {
                        this.append(name, value);
                    }
                }
            }
        });

    }

    append(name, value) {
        this._add_ns(name);

        this._data.push({
            name: name,
            value: value
        });
    }

    delete(name) {
        let data = [];
        this._ns = [];

        each(this._data, item => {
            if (!name === item.name) {
                data.push(item);

                this._add_ns(name);
            }
        });
    }

    get(name) {
        return Object.assign({}, this._data.find(function(element){
            return element.name === name;
        }));
    }

    set(name, value) {
        this.append(name, value);
    }

    has(name) {
        return this._ns.includes(name);
    }

    getAll() {
        return this._data;
    }

    _add_ns(name) {
        if (!this._ns.includes(name)) {
            this._ns.push(name);
        }
    }

    make() {
        let form = new FormData();

        each(this._data, item => {
            form.append(item.name, item.value);
        });

        return form;
    }
};
