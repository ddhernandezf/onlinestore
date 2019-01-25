var MySQL = require('../../artifacts/MySQL'),
    Databases = require('../../configurations/Databases');

class Enterprise {
    constructor(id, corporation, name, application) {
        this.Id = id;
        this.Name = name;
        this.Corporation = corporation;
        this.Application = application;
    }
}

module.exports = Enterprise;

Enterprise.prototype.Get = function(callback){
    var DbConfig = new Databases(this.Application.locals.ENVIRONMENT, this.Application.locals.DB_STORAGE);
    var db = new MySQL(DbConfig.MySQL);
    var parameters = [this.Id, this.Corporation, this.Name];

    db.Execute('CALL EnterpriseGet(?,?,?);', parameters, function (error, data) {
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