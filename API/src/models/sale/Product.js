var MySQL = require('../../artifacts/MySQL'),
    Databases = require('../../configurations/Databases');

class Product {
    constructor(id, enterprise,  type, name,  description,  price, application) {
        this.Id = id;
        this.Enterprise = enterprise;
        this.Type = type;
        this.Name = name;
        this.Description = description;
        this.Price = price;
        this.Application = application;
    }
}

module.exports = Product;

Product.prototype.Get = async function(){
    return new Promise((success, fail) => {
        var DbConfig = new Databases(this.Application.locals.ENVIRONMENT, this.Application.locals.DB_STORAGE);
        var db = new MySQL(DbConfig.MySQL);
        var parameters = [this.Id, this.Enterprise, this.Type, this.Name, this.Description, this.Price];

        db.Execute('CALL ProductGet (?,?,?,?,?,?);', parameters, function (error, data) {
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