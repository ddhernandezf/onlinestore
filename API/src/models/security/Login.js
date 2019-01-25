var MySQL = require('../../artifacts/MySQL'),
    Databases = require('../../configurations/Databases');

class Login {
    constructor(username, password, application) {
        this.Username = username;
        this.Password = password;
        this.Application = application;
    }
}

module.exports = Login;

Login.prototype.Get = function(callback){
    var DbConfig = new Databases(this.Application.locals.ENVIRONMENT, this.Application.locals.DB_STORAGE);
    var db = new MySQL(DbConfig.MySQL);
    var parameters = [this.Username, this.Password];

    db.Execute('CALL Authenticate(?,?);', parameters, function (error, data) {
        if(error){
            db.Connection.destroy();
            return callback(true, error);
        }
        else {
            if(data.length === 1){
                db.Connection.destroy();
                return callback(false, data[0]);
            }
            else{
                db.Connection.destroy();
                return callback(true, null);
            }
        }
    });
};