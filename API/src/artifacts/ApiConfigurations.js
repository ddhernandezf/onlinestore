var bodyParser = require('body-parser'),
    basicAuth = require('express-basic-auth'),
    ApiHandler = require('./ApiHandler'),
    BasicAuthentication = require('../models/security/BasicAuthentication');

module.exports = function(application){
    var Token = '';

    application.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
        response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Token');

        if ('OPTIONS' === request.method)
            response.sendStatus(200);
        else
            next();
    });
    application.use(bodyParser.urlencoded({ extended: true }));
    application.use((request, response, next) => {
        var token = request.headers['token'];
        if (token !== undefined || token !== null || token !== ''){
            Token = request.headers['token'];
            next();
        }
        else {
            response.set('Content-Type', 'application/json;charset=utf-8');
            response.status(500);
            response.send(JSON.stringify('Los niveles de seguridad no han sido superados.'));
        }
    });
    application.use((request, response, next) => {
        bodyParser.json({
            verify: addRawBody,
        })(request, response, (error) => {
            if (error) {
                var handler = new ApiHandler(response, request);

                if(error.type === 'entity.parse.failed' && error.statusCode === 400) {
                    handler.GetResponse(handler.GetResponseHeaders, 500, 'Error de formato en el modelo en la solicitud', true);
                }
                else {
                    handler.GetResponse(handler.GetResponseHeaders, 500, 'Error desconocido', true);
                }

                return;
            }

            next();
        });
    });
    application.use(basicAuth({
        authorizer: Authorize,
        authorizeAsync: true
    }));

    function Authorize(username, password, callback) {
        var user = new BasicAuthentication(username, password, Token, application);

        user.Authenticate(function (result) {
            return callback(null, result);
        });
    }

    function addRawBody(req, res, buf, encoding) {
        req.rawBody = buf;
    }
}