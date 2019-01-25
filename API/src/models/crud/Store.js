var MySQL = require('../../artifacts/MySQL'),
    Databases = require('../../configurations/Databases');

class Store {
    constructor(id, enterprise, name, application) {
        this.Id = id;
        this.Enterprise = enterprise;
        this.Name = name;
        this.Application = application;
    }
}

module.exports = Store;

Store.prototype.Get = function(callback){
    var DbConfig = new Databases(this.Application.locals.ENVIRONMENT, this.Application.locals.DB_STORAGE);
    var db = new MySQL(DbConfig.MySQL);
    var parameters = [this.Id, this.Enterprise, this.Name];

    db.Execute('CALL StoreGet(?,?,?);', parameters, function (error, data) {
        if(error){
            db.Connection.destroy();
            return callback(true, error);
        }
        else {
            db.Connection.destroy();
            return callback(false, data);
        }
    });
}