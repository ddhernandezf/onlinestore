var ApiHandler = require('../../artifacts/ApiHandler'),
    CustomerStudent = require('../../models/crud/CustomerStudent');

module.exports = async function(application){
    application.post('/Seguridad/AnadirEstudiante', function(request, response){
        var handler = new ApiHandler(response, request);

        try {
            if(Validate(request.body) === true){
                var model = new CustomerStudent(request.body.Student, request.body.Grade, request.body.Username, 
                            application);

                model.Add()
                .then((data) => {
                    handler.GetResponse(handler.GetResponseHeaders, 200, true, true);
                })
                .catch((error) => {
                    handler.GetResponse(handler.GetResponseHeaders, 500, error, true);
                });
            }
        }
        catch (error) {
            handler.GetResponse(handler.GetResponseHeaders, 500, error.message, true);
        }
    });

    function Validate(model){
        if(!('Student' in model) || !('Grade' in model) || !('Username' in model)){
            throw new Error('El modelo de parámetros no cuenta con el formato correcto.');
        }

        return true;
    }
};
