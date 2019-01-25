var MySQL = require('../../artifacts/MySQL'),
    Databases = require('../../configurations/Databases');

class Student {
    constructor(id, store, firstname, lastname, application) {
        this.Id = id;
        this.Store = store;
        this.Firstname = firstname;
        this.Lastname = lastname;
        this.Application = application;
    }
}

module.exports = Student;

Student.prototype.Get = function(callback){
    var DbConfig = new Databases(this.Application.locals.ENVIRONMENT, this.Application.locals.DB_STORAGE);
    var db = new MySQL(DbConfig.MySQL);
    var parameters = [this.Id, this.Store, this.Firstname, this.Lastname];

    db.Execute('CALL StudentGet(?,?,?,?);', parameters, function (error, data) {
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

Student.prototype.GetByUser = function(username, callback){
    var DbConfig = new Databases(this.Application.locals.ENVIRONMENT, this.Application.locals.DB_STORAGE);
    var db = new MySQL(DbConfig.MySQL);
    var parameters = [username];

    db.Execute('CALL CustomerStudentsGet(?);', parameters, function (error, data) {
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