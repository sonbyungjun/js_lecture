var express = require('express');
var router = express.Router();

router.get("/", function(req, res){
    console.log("메인");
    res.render('index')
});


module.exports = router;
