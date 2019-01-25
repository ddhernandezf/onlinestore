var MySQL = require('../artifacts/MySQL'),
    Databases = require('../configurations/Databases');

class ProductType {
    constructor(card, expiremonth, expireyear, credithouse, vcc, ownername, application) {
        this.Card = card;
        this.ExpireMonth = expiremonth;
        this.ExpireYear = expireyear;
        this.CreditHouse = credithouse;
        this.VCC = vcc;
        this.OwnerName = ownername;
        this.Application = application;
    }
}

module.exports = ProductType;

ProductType.prototype.Get = function(callback){
    var DbConfig = new Databases(this.Application.locals.ENVIRONMENT, this.Application.locals.DB);
    var db = new MySQL(DbConfig.MySQL);
    var parameters = [this.Card, this.ExpireMonth, this.ExpireYear, this.CreditHouse, this.VCC, this.OwnerName];

    db.Execute('CALL CheckCards (?,?,?,?,?,?);', parameters, function (error, data) {
        if(error) {
            db.Connection.destroy();
            return callback(true, error);
        }
        else {
            db.Connection.destroy();
            var validtion = (data.length > 0),
                response = {};

            if(validtion){
                response = {
                    HasError: !validtion,
                    TransactionNumber: 321654987,
                    AuthorizationNumber: 987987654
                };
            }
            else {
                response = {
                    HasError: !validtion,
                    Message: 'Transacción no autorizada'
                }
            }

            return callback(false, response);
        }
    });
};