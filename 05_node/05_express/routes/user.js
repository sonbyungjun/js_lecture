var express = require('express');
var router = express.Router();

var userDAO = require('../models/dao/userDAO');

router.get("/login", function(req, res){
    console.log("로그인");
    res.render('login')
});

router.post("/login", function(req, res){
    var id = req.body.id
    var pw = req.body.pw
    var arr = [id,pw]

    userDAO.login(arr, function(err, result){
        if(err){
            // next(err);
            return;
        }
        res.render("index", {user : result[0]});
    })
});

router.get("/signup", function(req, res){
    console.log("회원가입");
    res.render('signup')
});

router.post("/signup", function(req, res){
    var id = req.body.id
    var pw = req.body.pw
    var name = req.body.name
    var age = req.body.age
    var gender = req.body.gender
    var arr = [id,pw,name,age,gender]

    userDAO.signup(arr, function(err, result){
        if(err){
            return;
        }
        res.render("signup", result);
    })
});

module.exports = router;
