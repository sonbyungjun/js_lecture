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
            // console.log(results)
            callback(null, results);
        })
    },

    delGuestBook : function(no, callback){
        var sql = `delete from guest_books where no = ?`
        con.query(sql, no, function (err, result, fields) {
            if (err){
                callback(err)
                return;
            }
            callback(null, result);
        })
    },

    updateGuestBook : function(arr, callback){
        var sql = 'update guest_books set content = ? where no = ?' // ` 쓰지 마라
        con.query(sql, arr, function(err, result, fields) {
            if(err){
                callback(err)
                return
            }
            callback(null, result);
        })
    }


}

module.exports = guestBookDAO;