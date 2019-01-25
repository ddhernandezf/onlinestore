var ApiHandler = require('../../artifacts/ApiHandler'),
    RequestHeader = require('../../models/sale/RequestHeader'),
    RequestDetail = require('../../models/sale/RequestDetail');

module.exports = async function(application){
    application.post('/Venta/Compras', async function(request, response){
        var handler = new ApiHandler(response, request);

        try {
            if(ValidateHeader(request.body) === true){
                var model = new RequestHeader(request.body.Student, request.body.Username, application);

                model.Get().then((data) => {
                    handler.GetResponse(handler.GetResponseHeaders, 200, data, true);
                }).catch((error) => {
                    handler.GetResponse(handler.GetResponseHeaders, 500, error, true);
                });
            }
        }
        catch (error) {
            handler.GetResponse(handler.GetResponseHeaders, 500, error.message, true);
        }
    });

    application.post('/Venta/ComprasDetalle', async function(request, response){
        var handler = new ApiHandler(response, request);

        try {
            if(ValidateDetail(request.body) === true){
                var model = new RequestDetail(request.body.Sale, application);

                model.Get().then((data) => {
                    handler.GetResponse(handler.GetResponseHeaders, 200, data, true);
                }).catch((error) => {
                    handler.GetResponse(handler.GetResponseHeaders, 500, error, true);
                });
            }
        }
        catch (error) {
            handler.GetResponse(handler.GetResponseHeaders, 500, error.message, true);
        }
    });

    function ValidateHeader(model){
        if(!('Student' in model) || !('Username' in model)){
            throw new Error('El modelo de parámetros no cuenta con el formato correcto.');
        }

        return true;
    }

    function ValidateDetail(model){
        if(!('Sale' in model)){
            throw new Error('El modelo de parámetros no cuenta con el formato correcto.');
        }

        return true;
    }
};
