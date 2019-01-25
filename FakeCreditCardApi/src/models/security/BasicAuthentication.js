var MySQL = require('../../artifacts/MySQL'),
    Databases = require('../../configurations/Databases');

class BasicAuthentication {
    constructor(username, password, token, application) {
        this.Username = username;
        this.Password = password;
        this.Token = token;
        this.Application = application;
    }
}

module.exports = BasicAuthentication;

BasicAuthentication.prototype.Authenticate = function(callback){
    var DbConfig = new Databases(this.Application.locals.ENVIRONMENT, this.Application.locals.DB_SECURITY);
    var db = new MySQL(DbConfig.MySQL);
    var parameters = [this.Username, this.Password, this.Token];

    db.Execute('CALL BasicAuthentication(?,?,?);', parameters, function (error, data) {
        if(error){
            db.Connection.destroy();
            return false;
        }
        else {
            if(data.length === 1) {
                if(data.Username === this.Username){
                    db.Connection.destroy();
                    return callback(true);
                }
                else{
                    db.Connection.destroy();
                    return callback(false);
                }
            }
            else {
                db.Connection.destroy();
                return callback(false);
            }
        }
    });
}