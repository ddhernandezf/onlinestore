var MySQL = require('../../artifacts/MySQL'),
    Databases = require('../../configurations/Databases');

class ProductImages {
    constructor(product, image, application) {
        this.Product = product;
        this.Image = image;
        this.Application = application;
    }
}

module.exports = ProductImages;

ProductImages.prototype.Get = async function(){
    return new Promise((success, fail) => {
        var DbConfig = new Databases(this.Application.locals.ENVIRONMENT, this.Application.locals.DB_STORAGE);
        var db = new MySQL(DbConfig.MySQL);
        var parameters = [this.Product, this.Image];

        db.Execute('CALL ProductImageGet (?,?);', parameters, function (error, data) {
            if(error){
                db.Connection.destroy();
                return fail(error);
            }
            else {
                var result = [];

                for (let i = 0; i < data.length; i++) {
                    result.push(data[i].Image);
                }

                db.Connection.destroy();
                return success(result);
            }
        });
    });
};