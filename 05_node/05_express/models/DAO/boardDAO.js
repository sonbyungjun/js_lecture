var con = require('../db-connect');

var boardDAO = {

    addBoard : function(params, callback){
        var sql = `insert into board set ?`
        con.query(sql , params , function (err, result, fields) {
            if (err){
                callback(err)
                return;
            }
            callback(null, result);
        })
    },

    listBoard : function(callback){
        var sql = `select * from board order by no desc`
        con.query(sql, function (err, results, fields) {
            if (err){
                callback(err)
                return;
            }
            // console.log(results)
            callback(null, results);
        })
    },

    viewboard : function(no, callback){
        var sql = `select * from board where no = ?`
        con.query(sql, no, function(err, result, fields) {
            if(err){
                callback(err)
                return
            }
            callback(null, result[0]);
        })
    },

}

module.exports = boardDAO;