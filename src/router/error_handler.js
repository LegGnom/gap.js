let error_handler = function (request, response) {
    response.send(
        response.getBody() || `<DOCTYPE!><html><head></head><body><h1>${response.getStatus()}</h1>${response.getStatusMessage()}</body></html>`
    );
};

module.exports = {
    set(handler) {
        error_handler = handler;
    },

    run(request, response) {
        new error_handler(request, response);
    }
};