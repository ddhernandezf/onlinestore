var MySQL = require('../../artifacts/MySQL'),
    Databases = require('../../configurations/Databases');

class CustomerStudent {
    constructor(student, grade, username, application) {
        this.Student = student;
        this.Grade = grade;
        this.Username = username;
        this.Application = application;
    }
}

module.exports = CustomerStudent;

CustomerStudent.prototype.Add = async function(){
    return new Promise((success, fail) => {
        var DbConfig = new Databases(this.Application.locals.ENVIRONMENT, this.Application.locals.DB_STORAGE);
        var db = new MySQL(DbConfig.MySQL);
        var parameters = [this.Student, this.Grade, this.Username];

        db.Execute('CALL CustomerStudentAdd(?,?,?);', parameters, function (error, data) {
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