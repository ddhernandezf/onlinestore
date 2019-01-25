var MySQL = require('../../artifacts/MySQL'),
    Databases = require('../../configurations/Databases');

class CreditCard {
    constructor(id, name,  image, application) {
        this.Id = id;
        this.Name = name;
        this.image = image;
        this.Application = application;
    }
}

module.exports = CreditCard;

CreditCard.prototype.Get = async function(){
    return new Promise((success, fail) => {
        var DbConfig = new Databases(this.Application.locals.ENVIRONMENT, this.Application.locals.DB_STORAGE);
        var db = new MySQL(DbConfig.MySQL);
        var parameters = [this.Id, this.Name, this.image];

        db.Execute('CALL CreditCardGet (?,?,?);', parameters, function (error, data) {
            if(error){
                db.Connection.destroy();
                return fail(error);
            }
            else{
                db.Connection.destroy();
                return success(data);
            }
        });
    });
};