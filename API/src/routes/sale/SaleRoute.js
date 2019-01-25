var ApiHandler = require('../../artifacts/ApiHandler'),
Sale = require('../../models/sale/Sale');

module.exports = async function(application){
    application.post('/Venta/RegistrarCompra', async function(request, response){
        var handler = new ApiHandler(response, request);

        try {
            if(Validate(request.body) === true){
                console.log(request.body);
                var model = new Sale(request.body.Customer, request.body.Products, request.body.TotalAmmout,
                    request.body.TotalItems, application);

                model.ValidateCreditCard().then(async (data) => {
                    var headerResponse = await model.SaveHeader();
                    if(headerResponse.RequestNumber != null) {
                        var result = data;
                        result['SaleId'] = headerResponse.RequestNumber;
                        result['CardName'] = model.Customer.CardName;

                        var resp = await model.SaveCardResponse(result);
                        var resp = await model.SaveInvoiceInfo({
                            Sale: headerResponse.RequestNumber,
                            CustomerName: request.body.Customer.CompleteName,
                            TaxNumber: request.body.Customer.TaxNumber,
                            Address: request.body.Customer.Address
                        });

                        for (let i = 0; i < request.body.Products.length; i++) {
                            const element = request.body.Products[i];
                            resp = await model.SaveDetail({
                                SaleId: headerResponse.RequestNumber,
                                Product: element.Id,
                                Quantity: element.Quantity,
                                Price: element.Price
                            });
                            
                        }

                        resp = await model.Verify(headerResponse.RequestNumber);

                        handler.GetResponse(handler.GetResponseHeaders, 200, {
                            AllOk: resp.Result === 1
                        }, true);
                    }
                    else {
                        handler.GetResponse(handler.GetResponseHeaders, 500, 'Error al intentar guardar la transacción.', true);
                    }
                }).catch((error) => {
                    console.log(error);
                    handler.GetResponse(handler.GetResponseHeaders, 500, error, true);
                });
            }
        }
        catch (error) {
            handler.GetResponse(handler.GetResponseHeaders, 500, error.message, true);
        }
    });

    function Validate(model){
        if(!('Customer' in model) || !('Products' in model) || !('TotalAmmout' in model) || !('TotalItems' in model)){
            throw new Error('El modelo de parámetros no cuenta con el formato correcto.');
        }

        return true;
    }
};
