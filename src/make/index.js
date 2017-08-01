const RouterStorage = require('../router/storage');
const App = require('../app');
const isClass = require('../helper/is-class');
const each = require('../helper/each');
const execGenerator = require('../helper/exec-generator');


module.exports = function (request, response) {
    let routes = RouterStorage.search(request.url);

    each(routes, part => {

        if (part.data.methods) {
            if (!part.data.methods.includes(request.method)) {
                return;
            }
        }

        each(part.handlers, handler => {
            if (isClass(handler)) {
                new handler(
                    request.create(null, null, null, part.params),
                    response
                );
            } else {
                handler = handler(
                    request.create(null, null, null, part.params),
                    response
                );

                execGenerator(handler);
            }
        });
    });



    if (!routes.length) {
        response.then(result => {
            response.abort();
        });
    }

    response.catch(err => {
        App.emit('error', err.stack);
        response.abort(err, 500);
    });
};