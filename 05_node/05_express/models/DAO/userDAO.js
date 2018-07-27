var con = require('../db-connect');

var userDAO = {

    login : function(arr, callback){
        var sql = `select * from users where id = ? and pw = ?`
        con.query(sql , arr , function (err, result, fields) {
            if (err){
                callback(err)
                return;
            }
            callback(null, result[0]);
        })
    },

    signup : function(arr, callback){
        var sql = `insert into users set ?`
        con.query(sql , arr , function (err, result, fields) {
            if (err){
                callback(err)
                return;
            }
            callback(null, result);
        })
    },

    list : function(callback){
        var sql = `select * from users`
        con.query(sql, function(err, results, fields) {
            if(err){
                callback(err)
                return
            }
            callback(null, results);
        })
    },

    detail : function(no, callback){
        var sql = `select * from users where no = ?`
        con.query(sql, no, function(err, result, fields) {
            if(err){
                callback(err)
                return
            }
            callback(null, result[0]);
        })
    },

    delete : function(no, callback){
        var sql = `delete from users where no = ?`
        con.query(sql, no, function(err, result, fields) {
            if(err){
                callback(err)
                return
            }
            callback(null, result);
        })
    },

    update : function(arr, callback){
        var sql = 'update users set ? where no = ?' // ` 쓰지 마라
        con.query(sql, arr, function(err, result, fields) {
            if(err){
                callback(err)
                return
            }
            callback(null, result);
        })
    },

    removeToken : function(user_no, callback){
        var sql = 'delete from tokens where user_no = ? or max_date < now()'
        con.query(sql, user_no, function(err, result, fields) {
            if(err){
                callback(err)
                return
            }
            callback(null, result);
        })
    },

    makeToken : function(arr, callback){

        var sql = 'select count(*) as count from tokens where user_no = ?'
        con.query(sql , arr.user_no , function (err, result, fields) {
            if (err){
                callback(err)
                return;
            }
            if(result[0].count<1){
                var sql = 'insert into tokens set ?'
                con.query(sql , arr , function (err, result, fields) {
                    if (err){
                        callback(err)
                        return;
                    }
                    callback(null, result);
                })
            }
        })
    },

    checkToken : function(arr, callback){
        var sql = `select u.*
                        from tokens t, users u
                    where t.user_no = u.no 
                    and t.token = ?
                    and t.max_date >= now()
                    `
        con.query(sql , arr , function (err, result, fields) {
            if (err){
                callback(err)
                return;
            }
            callback(null, result[0]);
        })
    },
    
    
}

module.exports = userDAO;