var express = require('express'),
    application = express(),
    port = 3001,
    ApiConfigurations = require('./src/artifacts/ApiConfigurations'),
    ApiHandler = require('./src/artifacts/ApiHandler');

var UserRoute = require('./src/routes/security/UserRoute'),
    CorporationRoute = require('./src/routes/crud/CorporationRoute'),
    EnterpriseRoute = require('./src/routes/crud/EnterpriseRoute'),
    StoreRoute = require('./src/routes/crud/StoreRoute'),
    StudentRoute = require('./src/routes/crud/StudentRoute'),
    ProductTypeRoute = require('./src/routes/sale/ProductTypeRoute'),
    ProductRoute = require('./src/routes/sale/ProductRoute'),
    CreditCardRoute = require('./src/routes/sale/CreditCardRoute'),
    SaleRoute = require('./src/routes/sale/SaleRoute'),
    RequestRoute = require('./src/routes/sale/RequestRoute'),
    CustomerStudentRoute = require('./src/routes/security/CustomerStudentRoute');

application.locals.ENVIRONMENT = 'DEV';
application.locals.DB_SECURITY = 'SECURITY';
application.locals.DB_STORAGE = 'STORAGE';

ApiConfigurations(application);

UserRoute(application);
CorporationRoute(application);
EnterpriseRoute(application);
StoreRoute(application);
StudentRoute(application);
ProductTypeRoute(application);
ProductRoute(application);
CreditCardRoute(application);
SaleRoute(application);
RequestRoute(application);
CustomerStudentRoute(application);

application.listen(port, '0.0.0.0');