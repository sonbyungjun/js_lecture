var con = require('../db-connect');

var guestBookDAO = {

    addGuestBook : function(params, callback){
        var sql = `insert into guest_books set ?`
        con.query(sql , params , function (err, result, fields) {
            if (err){
                callback(err)
                return;
            }
            callback(null, result);
        })
    },

    listGuestBook : function(user_no, callback){
        var sql = `select * from guest_books where user_no = ? order by no desc`
        con.query(sql, user_no, function (err, results, fields) {
            if (err){
                callback(err)
                return;
            }
            console.log(results)
            callback(null, results);
        })
    }
}

module.exports = guestBookDAO;