var MySQL = require('../../artifacts/MySQL'),
    Databases = require('../../configurations/Databases');

class ProductType {
    constructor(id, enterprise,  name, image, parent, application) {
        this.Id = id;
        this.Enterprise = enterprise;
        this.Name = name;
        this.Image = image;
        this.Parent = parent;
        this.Application = application;
    }
}

module.exports = ProductType;

ProductType.prototype.Get = function(callback){
    var DbConfig = new Databases(this.Application.locals.ENVIRONMENT, this.Application.locals.DB_STORAGE);
    var db = new MySQL(DbConfig.MySQL);
    var parameters = [this.Id, this.Enterprise, this.Name, this.Image, this.Parent];

    db.Execute('CALL ProductTypeGet (?,?,?,?,?);', parameters, function (error, data) {
        if(error) {
            db.Connection.destroy();
            return callback(true, error);
        }
        else {
            db.Connection.destroy();
            return callback(false, data);
        }
    });
};