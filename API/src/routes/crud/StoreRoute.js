var ApiHandler = require('../../artifacts/ApiHandler'),
    Store = require('../../models/crud/Store');

module.exports = async function(application){
    application.get('/Catalogo/Bodega/:id?', function(request, response){
        var handler = new ApiHandler(response, request);

        try {
            var model =  new Store(request.params.id, null, null, application);

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
        if(!('Id' in model) || !('Enterprise' in model) || !('Name' in model)){
            throw new Error('El modelo de parámetros no cuenta con el formato correcto.');
        }

        return true;
    }
};
