var ApiHandler = require('../../artifacts/ApiHandler'),
    Product = require('../../models/sale/Product'),
    ProductSpecs = require('../../models/sale/ProductSpecs'),
    ProductImages = require('../../models/sale/ProductImages');

module.exports = async function(application){
    application.post('/Venta/Producto', async function(request, response){
        var handler = new ApiHandler(response, request);

        try {
            if(Validate(request.body) === true){
                var model = new Product(request.body.Id, request.body.Enterprise, request.body.Type, request.body.Name,
                    request.body.Description, request.body.Price, application);

                var data = await model.Get();
                var result = [];

                for (let i = 0; i < data.length; i++) {
                    var modelSpecs = new ProductSpecs(data[i].Id, null, null, application);
                    var modelImage = new ProductImages(data[i].Id, null, application);

                    result.push({
                        Id: data[i].Id,
                        Enterprise: {
                            Id: data[i].Enterprise,
                            Name: data[i].EnterpriseName,
                            Corporation: data[i].EnterpriseCorporation
                        },
                        Type: {
                            Id: data[i].Type,
                            Enterprise: data[i].TypeEnterprise,
                            Name: data[i].TypeName,
                            Image: data[i].TypeImage,
                            Parent: data[i].TypeParent
                        },
                        Name: data[i].Name,
                        Description: data[i].Description,
                        Price: data[i].Price,
                        Specs: await modelSpecs.Get(),
                        Images: await modelImage.Get(),
                        Quantity: 1
                    });
                }

                handler.GetResponse(handler.GetResponseHeaders, 200, result, true);
            }
        }
        catch (error) {
            handler.GetResponse(handler.GetResponseHeaders, 500, error.message, true);
        }
    });

    function Validate(model){
        if(!('Id' in model) || !('Enterprise' in model) || !('Type' in model) || !('Name' in model)
            || !('Description' in model) || !('Price' in model)){
            throw new Error('El modelo de parámetros no cuenta con el formato correcto.');
        }

        return true;
    }
};
