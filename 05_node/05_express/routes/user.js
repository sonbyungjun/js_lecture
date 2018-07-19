var express = require('express');
var router = express.Router();
var middle = require('./middelware.js')
var userDAO = require('../models/dao/userDAO');

router.get("/login", function(req, res){
    console.log("로그인");
    res.render('user/login')
});

router.get("/logout", function(req, res){
    console.log("로그아웃");
    req.session.destroy();
    res.clearCookie('user');
    res.redirect('/');
});

router.post("/login", function(req, res){
    var id = req.body.id
    var pw = req.body.pw
    var arr = [id,pw]

    userDAO.login(arr, function(err, result){
        if(err){
            // next(err);
            return next(err);;
        }
        req.session.user = result[0];
        res.redirect('/');
    })
});


router.get("/signup", function(req, res){
    console.log("회원가입");
    res.render('user/signup')
});

router.post("/signup", function(req, res){
    // var arr = [req.body]
    // for(var key in req.body){
    //     arr.push(req.body[key])
    // }

    userDAO.signup(req.body, function(err, result){
        if(err) return next(err);;
        // res.render("login");
        res.redirect('/user/login');
    })
});

router.get("/list", middle.isLogin(), function(req, res, next){
    userDAO.list(function(err, result){
        if(err) return next(err);
        
        for(var r of result){
            r.reg_date = moment(r.reg_date)
        }
        res.render('user/userList', {users : result});
    })
})

router.get("/detail", function(req, res, next){
    userDAO.detail(req.query.no, function(err, result){
        if(err){
            return next(err);
        }
        result[0].reg_date = moment(result[0].reg_date)
        res.render('user/userdetail',{user : result[0]});
    })
})

router.get("/delete", function(req, res, next){
    userDAO.delete(req.query.no, function(err, result){
        if(err){
            return next(err);
        }
        res.redirect('/user/list');
    })
})

router.post("/update", function(req, res){
    // var arr = [];
    // for(var key in req.body){
    //     arr.push(req.body[key]);
    // }
    // arr.push(req.query.no)

    var arr = [req.body, req.query.no]

    console.log(arr)

    userDAO.update(arr, function(err, result){
        if(err){
            return;
        }
        // res.render("login");
        res.redirect('/user/list');
    })
})

// POST는 body, GET은 query

function moment(time){
    var d = new Date(time)
    d = `${d.getFullYear()}년 ${d.getMonth()}월 ${d.getDate()}일 ${d.getHours()}시 ${d.getMinutes()}분`
    return d;
}

module.exports = router;
