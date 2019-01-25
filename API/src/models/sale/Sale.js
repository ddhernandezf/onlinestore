var MySQL = require('../../artifacts/MySQL'),
    Databases = require('../../configurations/Databases'),
    request = require('request');

class Sale {
    constructor(customer, products,  totalammount, totalitems, application) {
        this.Customer = customer;
        this.Products = products;
        this.TotalAmmout = totalammount;
        this.TotalItems = totalitems;
        this.Application = application;
    }
}

module.exports = Sale;

Sale.prototype.ValidateCreditCard = async function(){
    return new Promise((success, fail) => {
        var options = {                 
            method: 'POST',             
            uri: 'http://localhost:3002/ValidarTarjeta',
            form: {
                Card: this.Customer.CardNumber,
                ExpireMonth: this.Customer.ExpireMonth,
                ExpireYear: this.Customer.ExpireYear,
                CreditHouse: this.Customer.CreditHouse.Name,
                VCC: this.Customer.VCC,
                OwnerName: this.Customer.CompleteName
            },                       
            headers: {               
              'Authorization': 'Basic ' + new Buffer("ddhernandezf:Letmein1.").toString('base64'),
              'Token': '927ecdf8-bbfe-11e8-8be8-74dfbf232ba7'             
            }
          };                                         
        
        request(options, function(error, response, body) {  
            if(error){
                return fail(error);
            }
            else{
                var apiResponse = JSON.parse(response.body);
                if(!apiResponse.HasError){
                    return success(apiResponse);
                }
                else {
                    return fail(apiResponse.Message);
                }
            }
        });
    });
};

Sale.prototype.SaveHeader = async function(){
    return new Promise((success, fail) => {
        var DbConfig = new Databases(this.Application.locals.ENVIRONMENT, this.Application.locals.DB_STORAGE);
        var db = new MySQL(DbConfig.MySQL);
        var parameters = [
            this.Customer.Child.Id,
            this.Customer.Child.Store.Id,
            this.Customer.CreditHouse.Id,
            this.Customer.User,
            this.TotalAmmout
                        ];

        db.Execute('CALL SaleRequestAddHeader(?,?,?,?,?);', parameters, function (error, data) {
            if(error){
                db.Connection.destroy();
                return fail(error);
            }
            else{
                db.Connection.destroy();
                return success(data[0]);
            }
        });
    });
};

Sale.prototype.SaveCardResponse = async function(cardresponse){
    return new Promise((success, fail) => {
        var DbConfig = new Databases(this.Application.locals.ENVIRONMENT, this.Application.locals.DB_STORAGE);
        var db = new MySQL(DbConfig.MySQL);
        var parameters = [cardresponse.SaleId, cardresponse.TransactionNumber, cardresponse.AuthorizationNumber,
                            cardresponse.CardName];

        db.Execute('CALL SaleRequestCreditCardResponseAdd(?,?,?,?);', parameters, function (error, data) {
            if(error){
                db.Connection.destroy();
                return fail(error);
            }
            else{
                db.Connection.destroy();
                return success(data);
            }
        });
    });
};

Sale.prototype.SaveInvoiceInfo = async function(model){
    return new Promise((success, fail) => {
        var DbConfig = new Databases(this.Application.locals.ENVIRONMENT, this.Application.locals.DB_STORAGE);
        var db = new MySQL(DbConfig.MySQL);
        var parameters = [model.Sale, model.CustomerName, model.TaxNumber, model.Address];

        db.Execute('CALL SaleRequestAddInvoiceInfo(?,?,?,?);', parameters, function (error, data) {
            if(error){
                db.Connection.destroy();
                return fail(error);
            }
            else{
                db.Connection.destroy();
                return success(data);
            }
        });
    });
};

Sale.prototype.SaveDetail = async function(detailmodel){
    return new Promise((success, fail) => {
        var DbConfig = new Databases(this.Application.locals.ENVIRONMENT, this.Application.locals.DB_STORAGE);
        var db = new MySQL(DbConfig.MySQL);
        var parameters = [detailmodel.SaleId, detailmodel.Product, detailmodel.Quantity, detailmodel.Price];

        db.Execute('CALL SaleRequestAddDetail(?,?,?,?);', parameters, function (error, data) {
            if(error){
                db.Connection.destroy();
                return fail(error);
            }
            else{
                db.Connection.destroy();
                return success(data);
            }
        });
    });
};

Sale.prototype.Verify = async function(SaleId){
    return new Promise((success, fail) => {
        var DbConfig = new Databases(this.Application.locals.ENVIRONMENT, this.Application.locals.DB_STORAGE);
        var db = new MySQL(DbConfig.MySQL);
        var parameters = [SaleId];

        db.Execute('CALL SaleRequestVerify(?);', parameters, function (error, data) {
            if(error){
                db.Connection.destroy();
                return fail(error);
            }
            else{
                db.Connection.destroy();
                return success(data[0]);
            }
        });
    });
};