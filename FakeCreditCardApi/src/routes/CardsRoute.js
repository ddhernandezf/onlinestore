var ApiHandler = require('../artifacts/ApiHandler'),
Cards = require('../models/Cards');

module.exports = async function(application){
    application.post('/ValidarTarjeta', function(request, response){
        var handler = new ApiHandler(response, request);

        try {
            if(Validate(request.body) === true){
                var model = new Cards(request.body.Card, request.body.ExpireMonth, request.body.ExpireYear,
                    request.body.CreditHouse, request.body.VCC, request.body.OwnerName, application);

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
        if(!('Card' in model) || !('ExpireMonth' in model) || !('ExpireYear' in model) || !('CreditHouse' in model)
            || !('VCC' in model) || !('OwnerName' in model)){
            throw new Error('El modelo de parámetros no cuenta con el formato correcto.');
        }

        return true;
    }
};
