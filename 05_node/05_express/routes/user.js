var express = require('express');
var router = express.Router();
var moment = require('moment');
moment.locale('ko');

var userDAO = require('../models/dao/userDAO');
var guestBookDAO = require('../models/dao/guestBookDAO');
var middle = require('./middleware.js');

router.get("/login", function (req, res) {
    res.render('user/login')
});

router.get("/logout", function (req, res) {
    req.session.destroy()
    res.clearCookie('token')
    res.redirect('/')
});

router.post("/login", function (req, res, next) {
    var arr = [req.body.id,req.body.pw]

    userDAO.login(arr, function(err, result){
        if (err) return next(err);
        if(result && req.body.keep){
            
            req.session.user = result   

            userDAO.removeToken(result.no, function(err){
                if (err) return next(err);
                var uuid = UUID()
                var params = {'token':uuid, 'user_no':result.no, 'max_date': nowAddOneDay()}
    
                userDAO.makeToken(params, function(err){
                    if (err) return next(err);
                    res.cookie('token', uuid, {
                        maxAge: 1000 * 60 * 60 * 24, // 1시간
                        httpOnly: true,
                    });
                    res.redirect('/')
                })
            })


        }else if(result && !req.body.keep){
            req.session.user = result
            res.redirect('/')
        }else{
            res.writeHead(401, {"Content-Type" : "text/html; charset=utf-8"})
            res.end(`<script>
                        alert("로그인 실패")
                        location.href = '/user/login'
                    </script>`)
        }
    })

});

router.get("/signup", function (req, res) {
    res.render('user/signup')
});

router.post("/signup", function(req, res, next) {
    // 서버에서도 유효성검사 하기
    userDAO.signup(req.body, function(err, result){
        if (err) {
            return next(err);
        }
        res.redirect('/')
    })
})

router.get('/list', middle.isLogin() ,function(req, res, next){

    var searchObj = {
        search : req.query.search ? req.query.search : null,
        sub : req.query.sub ? req.query.sub : 'id'
    }
    
    userDAO.list(searchObj, function(err, result){
        if (err) {
            return next(err);
        }
        for(var r of result){
            r.reg_date = moment(r.reg_date).fromNow()
        }
        res.render('user/userList', {users : result, searchObj : searchObj});
    })
})

router.get('/detail', middle.isLogin(), function(req, res, next){
    userDAO.detail(req.query.no ,function(err, result){
        if (err) return next(err);
        result.reg_date = moment(result.reg_date)

        guestBookDAO.listGuestBook(req.query.no, function(err, gbs){
            if(err) return next(err);
            for(var gb of gbs){
                gb.reg_date = moment(gb.reg_date).fromNow()
            }
            res.render('user/userDetail', {doc : result, gbs : gbs});
        })
    })
})

router.get('/delete', middle.isMine(), function(req, res, next){
    userDAO.delete(req.query.no ,function(err, result){
        if (err) return next(err);
        res.redirect('/user/list')
    })
})

router.post('/update', middle.isMine(), function(req, res, next){
    var arr = [req.body, req.query.no]
    userDAO.update(arr, function(err, result){
        if (err) return next(err);
        res.redirect('/user/list')
    })
})

router.get("/board", function (req, res) {
    res.render('user/board')
});

router.get("/writing", function (req, res) {
    res.render('user/writing')
});





router.post('/guestbook', middle.isLogin(), function(req, res, next){
    var params = {
        user_no : req.body.user_no,
        content : req.body.content,
        writer_no : req.session.user.no,
        writer_id : req.session.user.id,
    }
    guestBookDAO.addGuestBook(params, function(err, result){
        if(err) return next(err);
        return res.json({success:true})
    })
})

router.get('/guestbook/delete', middle.isMineGuestbook(), function(req, res, next){
    guestBookDAO.delGuestBook(req.query.no ,function(err, result){
        if (err) return next(err);
        return res.json({success:true})
    })
})

router.post('/guestbook/update',middle.isMineGuestbook(), function(req, res, next){
    var arr = [req.body.content , req.body.no]
    console.log(arr)
    guestBookDAO.updateGuestBook(arr, function(err, result){
        if (err) return next(err);
        return res.json({success:true})
    })
})





function moment(time){
    var d = new Date(time)
    d = `${d.getFullYear()}년 ${d.getMonth()}월 ${d.getDate()}일 ${d.getHours()}시 ${d.getMinutes()}분`
    return d
}

function UUID(){
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function nowAddOneDay(){
    return new Date(new Date().getTime() + (1000*60*60*24));
}

module.exports = router;
