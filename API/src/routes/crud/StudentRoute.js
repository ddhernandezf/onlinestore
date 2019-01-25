var ApiHandler = require('../../artifacts/ApiHandler'),
    Student = require('../../models/crud/Student');

module.exports = async function(application){
    application.get('/Catalogo/Estudiante/:id?', function(request, response){
        var handler = new ApiHandler(response, request);

        try {
            var model =  new Student(request.params.id, null, null, null, application);

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
        if(!('Id' in model) || !('Store' in model) || !('Firstname' in model) || !('Lastname' in model)){
            throw new Error('El modelo de parámetros no cuenta con el formato correcto.');
        }

        return true;
    }
};
