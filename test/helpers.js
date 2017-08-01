const {assert} = require("chai");

const isString = require('../lib/helper/is-string');
const isFunction = require('../lib/helper/is-function');
const isClass = require('../lib/helper/is-class');


describe("Helper tests: ", () => {
    it("isString", () => {
        assert.isTrue(isString(''), 'string test');
        assert.isFalse(isString({}), 'object test');
        assert.isFalse(isString(1), 'number test');
    });

    it("isFunction", () => {
        assert.isTrue(isFunction(() => {}), 'function test');
        assert.isFalse(isFunction({}), 'object test');
        assert.isFalse(isFunction(1), 'number test');
    });

    it("isClass", () => {
        assert.isTrue(isClass(class {}), 'class test');
        assert.isFalse(isClass(function () {}), 'function test');
        assert.isFalse(isClass({}), 'object test');
    });
});