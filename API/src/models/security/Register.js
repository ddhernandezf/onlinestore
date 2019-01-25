var MySQL = require('../../artifacts/MySQL'),
    Databases = require('../../configurations/Databases');

class Register {
    constructor(corporation, enterprise, store, student, grade, username, password, firstname, lastname,
                address, telephone, application) {
        this.Corporation = corporation;
        this.Enterprise = enterprise;
        this.Store = store;
        this.Student = student;
        this.Grade = grade;
        this.Username = username;
        this.Password = password;
        this.Firstname = firstname;
        this.Lastname = lastname;
        this.Address = address;
        this.Telephone = telephone;
        this.Application = application;
    }
}

module.exports = Register;

Register.prototype.Do = function(callback){
    var DbConfig = new Databases(this.Application.locals.ENVIRONMENT, this.Application.locals.DB_STORAGE);
    var db = new MySQL(DbConfig.MySQL);
    var parameters = [this.Corporation, this.Enterprise, this.Store, this.Student, this.Grade, this.Username,
                    this.Password, this.Firstname, this.Lastname, this.Address, this.Telephone];

    db.Execute('CALL RegisterUser(?,?,?,?,?,?,?,?,?,?,?);', parameters, function (error, data) {
        if(error){
            db.Connection.destroy();
            return callback(true, 'El usuario ya se encuentra registrado o bien aún se encuentra en proceso de activación');
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

Register.prototype.Activate = function(code, callback){
    var DbConfig = new Databases(this.Application.locals.ENVIRONMENT, this.Application.locals.DB_STORAGE);
    var db = new MySQL(DbConfig.MySQL);
    var parameters = [this.Username, this.Password, code];

    db.Execute('CALL CustomerActivate(?,?,?);', parameters, function (error, data) {
        if(error){
            db.Connection.destroy();
            return callback(true, 'La activación ya ha sido realizada');
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