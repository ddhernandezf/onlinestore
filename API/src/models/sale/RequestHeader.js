var MySQL = require('../../artifacts/MySQL'),
    Databases = require('../../configurations/Databases');

class RequestHeader {
    constructor(student, username, application) {
        this.Student = student;
        this.Username = username;
        this.Application = application;
    }
}

module.exports = RequestHeader;

RequestHeader.prototype.Get = async function(){
    return new Promise((success, fail) => {
        var DbConfig = new Databases(this.Application.locals.ENVIRONMENT, this.Application.locals.DB_STORAGE);
        var db = new MySQL(DbConfig.MySQL);
        var parameters = [this.Student, this.Username];

        db.Execute('CALL SaleRequestGetHeader(?,?);', parameters, function (error, data) {
            if(error) {
                db.Connection.destroy();
                return fail(error);
            }
            else {
                db.Connection.destroy();
                return success(data);
            }
        });
    });
};