var ApiHandler = require('../../artifacts/ApiHandler'),
    Enterprise = require('../../models/crud/Enterprise');

module.exports = async function(application){
    application.get('/Catalogo/Empresa/:id?', function(request, response){
        var handler = new ApiHandler(response, request);

        try {
            var model =  new Enterprise(request.params.id, null, null, application);

            if(Validate(model) === true){
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
        if(!('Id' in model) || !('Corporation' in model) || !('Name' in model)){
            throw new Error('El modelo de parámetros no cuenta con el formato correcto.');
        }

        return true;
    }
};
