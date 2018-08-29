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

    list : function(obj, callback){
        var likeSql = obj.search ? `where ${obj.sub} like '%${obj.search}%'` : ''
        var sql = `select * from users ${likeSql} order by no desc`
        sql += ` limit ${obj.startPoint}, ${obj.pageList}`
        con.query(sql, function(err, results, fields) {
            if(err){
                callback(err)
                return
            }
            callback(null, results);
        })
    },

    count : function(obj, callback){
        var likeSql = obj.search ? `where ${obj.sub} like '%${obj.search}%'` : ''
        var sql = `select count(*) as count from users ${likeSql} order by no desc`
        con.query(sql, function(err, result, fields) {
            if(err){
                callback(err)
                return
            }
            callback(null, result[0]);
        })
    },

    detail : function(no, callback){
        var sql = `select u.*, p.origin_name, p.system_name, p.path
                        from users u left join profiles p
                    on u.no = p.user_no 
                        where u.no = ?`
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

    uploadProfiles : function(param, callback){
        var sql = `insert into profiles set ?`
        con.query(sql, param, function(err, result, fields){
            if(err) return callback(err)
            callback(null, result)
        })
    },

    signupApi : function(param, callback){
        var sql = 'insert into api_users set ?'
        con.query(sql, param, function(err, result, fields){
            if(err) return callback(err)
            callback(null, result)
        })
    },
    

    loginApi : function(param, callback){
        var sql = 'select * from api_users where id = ? and type = ?'
        con.query(sql, param, function(err, result, fields){
            if(err) return callback(err)
            callback(null, result[0])
        })
    },

    checkAPi : function(param, callback){
        var sql = 'select count(*) as count from api_users where id = ? and type = ?'
        con.query(sql, param, function(err, result, fields){
            if(err) return callback(err)
            callback(null, result[0])
        })
    }
    
}

module.exports = userDAO;