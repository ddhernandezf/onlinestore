var MySQL = require('../../artifacts/MySQL'),
    Databases = require('../../configurations/Databases');

class RequestDetail {
    constructor(sale, application) {
        this.Sale = sale;
        this.Application = application;
    }
}

module.exports = RequestDetail;

RequestDetail.prototype.Get = async function(){
    return new Promise((success, fail) => {
        var DbConfig = new Databases(this.Application.locals.ENVIRONMENT, this.Application.locals.DB_STORAGE);
        var db = new MySQL(DbConfig.MySQL);
        var parameters = [this.Sale];

        db.Execute('CALL SaleRequestGetDetail(?);', parameters, function (error, data) {
            if(error) {
                db.Connection.destroy();
                return fail(error);
            }
            else {
                db.Connection.destroy();
                return success(data);
            }
        });
    });
};