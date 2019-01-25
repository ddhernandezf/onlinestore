var ApiHandler = require('../../artifacts/ApiHandler'),
    ProductType = require('../../models/sale/ProductType');

module.exports = async function(application){
    application.post('/Venta/TipoProducto', function(request, response){
        var handler = new ApiHandler(response, request);

        try {
            if(Validate(request.body) === true){
                var model = new ProductType(request.body.Id, request.body.Enterprise, request.body.Name,
                    request.body.Image, request.body.Parent, application);

                model.Get(function (haserror, data) {
                    handler.GetResponse(handler.GetResponseHeaders, haserror === true ? 500 : 200, data, true);
                });
            }
        }
        catch (error) {
            handler.GetResponse(handler.GetResponseHeaders, 500, error.message, true);
        }
    });

    function Validate(model){
        if(!('Id' in model) || !('Enterprise' in model) || !('Name' in model) || !('Image' in model)
            || !('Parent' in model)){
            throw new Error('El modelo de parámetros no cuenta con el formato correcto.');
        }

        return true;
    }
};
