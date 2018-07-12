var con = require('../db-connect');

var userDAO = {

    login : function(arr, callback){
        var sql = `select * from users where id = ? and pw = ?`
        con.query(sql, arr, function(err, results, fields){
            if(err){
                callback(err)
                return;
            }
            callback(null, results);
        }) 
    },

    signup : function(arr, callback){
        var sql = `insert into users(id, pw, name, age, gender) values(?, ?, ?, ?, ?);`
        con.query(sql, arr, function(err, results, fields){
            if(err){
                callback(err)
                return;
            }
            callback(null, results);
        })
    }

}

module.exports = userDAO;
