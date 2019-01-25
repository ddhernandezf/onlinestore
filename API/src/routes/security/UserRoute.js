var ApiHandler = require('../../artifacts/ApiHandler'),
    Login = require('../../models/security/Login'),
    Register = require('../../models/security/Register'),
    Corporation = require('../../models/crud/Corporation'),
    Enterprise = require('../../models/crud/Enterprise'),
    Store = require('../../models/crud/Store'),
    Student = require('../../models/crud/Student');

module.exports = async function(application){
    application.post('/Seguridad/IniciarSesion', function(request, response){
        var handler = new ApiHandler(response, request);

        try {
            if(ValidateLoginModel(request.body) === true){
                var model = new Login(request.body.Username, request.body.Password, application);

                model.Get(function (haserror, data) {
                    if(haserror === true && data === null)
                        handler.GetResponse(handler.GetResponseHeaders, 500, 'Credenciales incorrectas.', true);
                    else {
                        var corp = new Corporation(data.Corporation, null, application);
                        corp.Get(function (errorCorp, dataCorp) {
                            if(errorCorp === false && dataCorp.length === 1){
                                var enp = new Enterprise(data.Enterprise, data.Corporation, null, application);
                                enp.Get(function (errorEnp, dataEnp) {
                                    if(errorEnp === false && dataEnp.length === 1) {
                                        var store = new Store(data.Store, data.Enterprise, null, application);
                                        store.Get(function (errorStore, dataStore) {
                                            if(errorStore === false && dataStore.length === 1) {
                                                var student = new Student(null, null, null, null, application);
                                                student.GetByUser(data.Email, function (errorStudent, dataStudent) {
                                                    var result = {
                                                        Email: data.Email,
                                                        Firstname: data.Firstname,
                                                        Lastname: data.Lastname,
                                                        Address: data.Address,
                                                        Telephone: data.Telephone
                                                    };

                                                    result['Corporation'] = dataCorp[0];
                                                    result['Enterprise'] = dataEnp[0];
                                                    result['Store'] = dataStore[0];
                                                    result['Childs'] = dataStudent;

                                                    handler.GetResponse(handler.GetResponseHeaders, haserror === true ? 500 : 200, result, true);
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
        catch (error) {
            handler.GetResponse(handler.GetResponseHeaders, 500, error.message, true);
        }
    });

    application.post('/Seguridad/RegistrarUsuario', function(request, response){
        var handler = new ApiHandler(response, request);

        try {
            if(ValidateRegisterModel(request.body) === true){
                var body = request.body;
                var model = new Register(body.Corporation, body.Enterprise, body.Store, body.Student,
                                body.Grade, body.Username, body.Password, body.Firstname, body.Lastname,
                                body.Address, body.Telephone, application);

                model.Do(function (haserror, data) {
                    handler.GetResponse(handler.GetResponseHeaders, haserror === true ? 500 : 200, data, true);
                });
            }
        }
        catch (error) {
            handler.GetResponse(handler.GetResponseHeaders, 500, error.message, true);
        }
    });

    application.post('/Seguridad/ActivarUsuario', function(request, response){
        var handler = new ApiHandler(response, request);

        try {
            if(ValidateActivateModel(request.body) === true){
                var body = request.body;
                var model = new Register(null, null, null, null, null, body.Username, body.Password, null, null,
                    null, null, application);

                model.Activate(body.Code, function (haserror, data) {
                    handler.GetResponse(handler.GetResponseHeaders, haserror === true ? 500 : 200, data, true);
                });
            }
        }
        catch (error) {
            handler.GetResponse(handler.GetResponseHeaders, 500, error.message, true);
        }
    });

    function ValidateLoginModel(model){
        if(!('Username' in model) || !('Password' in model)){
            throw new Error('El modelo en el cuerpo de la solicitud no cuenta con el formato correcto.');
        }

        return true;
    }

    function ValidateRegisterModel(model){
        if(!('Corporation' in model) || !('Enterprise' in model) || !('Store' in model) ||
            !('Student' in model) || !('Grade' in model) || !('Username' in model) ||
            !('Password' in model) || !('Firstname' in model) || !('Lastname' in model) ||
            !('Address' in model) || !('Telephone' in model)){
            throw new Error('El modelo en el cuerpo de la solicitud no cuenta con el formato correcto.');
        }

        return true;
    }

    function ValidateActivateModel(model){
        if(!('Username' in model) || !('Password' in model) || !('Code' in model)){
            throw new Error('El modelo en el cuerpo de la solicitud no cuenta con el formato correcto.');
        }

        return true;
    }
};
