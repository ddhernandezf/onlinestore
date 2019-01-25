var MySQL = require('../../artifacts/MySQL'),
    Databases = require('../../configurations/Databases');

class Corporation {
    constructor(id, name, application) {
        this.Id = id;
        this.Name = name;
        this.Application = application;
    }
}

module.exports = Corporation;

Corporation.prototype.Get = function(callback){
    var DbConfig = new Databases(this.Application.locals.ENVIRONMENT, this.Application.locals.DB_STORAGE);
    var db = new MySQL(DbConfig.MySQL);
    var parameters = [this.Id, this.Name];

    db.Execute('CALL CorporationGet(?,?);', parameters, function (error, data) {
        if(error){
            db.Connection.destroy();
            return callback(true, error);
        }
        else {
            db.Connection.destroy();
            return callback(false, data);
        }
    });
};