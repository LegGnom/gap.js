const {assert} = require("chai");

const each = require('../helper/each');
const Router = require('../router');


describe("Router tests: ", () => {

    it("resolve:", () => {
        each([
            ['/', '', '/'],
            ['/', '/', '/'],
            ['/m', '', '/m'],
            ['/m', '/', '/m/'],
            ['m/', 'm/', 'm/m/'],
            ['/m/', '/', '/m/'],
            ['/m///', '/b/', '/m/b/']
        ], item => {
            assert.isTrue(
                Router.resolve(...item.splice(0,2)) === item.pop()
            );
        });
    });

});