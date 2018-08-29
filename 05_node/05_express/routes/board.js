var express = require('express');
var router = express.Router();
var moment = require('moment');
moment.locale('ko');


var boardDAO = require('../models/dao/boardDAO');
var middle = require('./middleware.js');


//게시판
router.get("/", function (req, res) {
    boardDAO.listBoard(function(err, results){
        if (err) {
            return next(err);
        }
        for(var r of results){
            r.reg_date = moment(r.reg_date).format('llll')
        }
        // console.log(results)
        res.render('board/board', {docs : results});
    })
});


//게시판 뷰
router.get("/boardView", function (req, res) {
    boardDAO.viewboard(req.query.no, function(err, result){
        if (err) return next(err);
        result.reg_date = moment(result.reg_date).format('1111')
        res.render('board/boardView', {view : result});
    })
});



//게시판 글쓰기
router.get("/writing", function (req, res) {
    res.render('board/writing')
});

router.post("/writing", function(req, res, next) {
    var params = {
        title : req.body.title,
        content : req.body.content,
        writer_no : req.session.user.no,
        writer_id : req.session.user.id,
    }
    // 서버에서도 유효성검사 하기
    boardDAO.addBoard(params, function(err, result){
        if (err) {
            return next(err);
        }
        res.redirect('/board')
    })
})


function moment(time){
    var d = new Date(time)
    d = `${d.getFullYear()}년 ${d.getMonth()}월 ${d.getDate()}일 ${d.getHours()}시 ${d.getMinutes()}분`
    return d
}

module.exports = router;
