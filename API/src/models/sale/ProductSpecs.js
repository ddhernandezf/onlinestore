var MySQL = require('../../artifacts/MySQL'),
    Databases = require('../../configurations/Databases');

class ProductSpecs {
    constructor(product, speckey,  specvalue, application) {
        this.Product = product;
        this.SpecKey = speckey;
        this.SpecValue = specvalue;
        this.Application = application;
    }
}

module.exports = ProductSpecs;

ProductSpecs.prototype.Get = async function(){
    return new Promise((success, fail) => {
        var DbConfig = new Databases(this.Application.locals.ENVIRONMENT, this.Application.locals.DB_STORAGE);
        var db = new MySQL(DbConfig.MySQL);
        var parameters = [this.Product, this.SpecKey, this.SpecValue, this.Parent];

        db.Execute('CALL ProductSpecsGet(?,?,?);', parameters, function (error, data) {
            if(error) {
                db.Connection.destroy();
                return fail(error);
            }
            else {
                var result = [];

                for (let i = 0; i < data.length; i++) {
                    result.push({
                        Key: data[i].SpecKey,
                        Value: data[i].SpecValue
                    });
                }

                db.Connection.destroy();
                return success(result);
            }
        });
    });
};