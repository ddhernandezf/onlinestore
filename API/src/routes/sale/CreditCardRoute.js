var ApiHandler = require('../../artifacts/ApiHandler'),
    CreditCard = require('../../models/sale/CreditCard');

module.exports = async function(application){
    application.post('/Venta/TarjetaCredito', function(request, response){
        var handler = new ApiHandler(response, request);

        try {
            if(Validate(request.body) === true){
                var model = new CreditCard(request.body.Id, request.body.Name, request.body.Image, application);
                
                model.Get().then((data) => {
                    handler.GetResponse(handler.GetResponseHeaders, 200, data, true);
                }).catch((error) => {
                    handler.GetResponse(handler.GetResponseHeaders, 500, error, true);
                })
            }
        }
        catch (error) {
            handler.GetResponse(handler.GetResponseHeaders, 500, error.message, true);
        }
    });

    function Validate(model){
        if(!('Id' in model) || !('Name' in model) || !('Image' in model)){
            throw new Error('El modelo de parámetros no cuenta con el formato correcto.');
        }

        return true;
    }
};
