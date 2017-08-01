const nunjucks = require('nunjucks');
const isNode = require("../helper/is-node");


if (isNode()) {

    const env = new nunjucks.Environment(new nunjucks.FileSystemLoader);

    nunjucks.configure('/', {
        autoescape: true,
    });


    function registerTplExtensions(module, filename) {
        module.exports = {
            render: function (context) {
                return env.render(filename, context);
            }
        }
    }

    require.extensions['.html'] = registerTplExtensions;
    require.extensions['.njk'] = registerTplExtensions;
    require.extensions['.nunjucks'] = registerTplExtensions;

    require('./nunjucks.config')(env);

    module.exports = env;
}