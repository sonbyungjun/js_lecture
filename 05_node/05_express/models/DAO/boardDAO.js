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



}

module.exports = boardDAO;