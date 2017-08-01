module.exports = function (env) {
    env.addGlobal('run', function (component_name, options) {

        let json = JSON.stringify(options || []);

        json = json.replace(/</g, '&lt;');
        json = json.replace(/>/g, '&gt;');


        return '<script data-component="'+component_name+'" type="application/json">'+ json +'</script>';
    });
}