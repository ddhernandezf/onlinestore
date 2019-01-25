var LibMySQL = require('mysql');

class MySQL{
    constructor(Access){
        this.Connection = LibMySQL.createConnection({
            host: Access.host,
            user: Access.user,
            password: Access.password,
            database: Access.database,
            typeCast: function castField(field, useDefaultTypeCasting){
                if((field.type === 'BIT') && (field.length === 1)){
                    var bytes = field.buffer();
                    return(bytes[0] === 1);
                }

                return(useDefaultTypeCasting());
            }
        });
    }
}

module.exports = MySQL;

MySQL.prototype.Execute = function(query, params, callback){
    this.Connection.query(query, params, function(error, results){
        if(error){
            callback(true, error);
        }
        else {
            callback(false, results[0]);
        }
    });
}

MySQL.prototype.ExecuteNonQuery = function(query, params, callback){
    this.Connection.query(query, params, function(error){
        if(error) {
            throw new Error(error.message);
        }

        callback(true);
    });
}