var express = require('express'),
    application = express(),
    port = 3002,
    ApiConfigurations = require('./src/artifacts/ApiConfigurations');

var CardsRoute = require('./src/routes/CardsRoute');

application.locals.ENVIRONMENT = 'DEV';
application.locals.DB = 'FAKE';
application.locals.DB_SECURITY = 'SECURITY';

ApiConfigurations(application);

CardsRoute(application);

application.listen(port, '0.0.0.0');