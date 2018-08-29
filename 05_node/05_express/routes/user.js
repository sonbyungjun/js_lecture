var express = require('express');
var router = express.Router();
var moment = require('moment');
moment.locale('ko');

var userDAO = require('../models/dao/userDAO');
var guestBookDAO = require('../models/dao/guestBookDAO');
var boardDAO = require('../models/dao/boardDAO');
var middle = require('./middleware.js');

// const ROOT_DIR = '/uploads'  // PC ROOT 디렉토리에 저장됨
const ROOT_DIR = 'uploads/' // 현재 프로젝트에 저장됨
const PATH_DIR = 'user_profile'

var multer = require("multer");
var fs = require("fs-extra");
var uuid = require("uuid/v4");
var path = require("path");

//디스크 스토리지는 파일을 디스크에 저장하기 위한 모든 제어 기능을 제공합니다.
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        var dir = ROOT_DIR+PATH_DIR;
        fs.ensureDirSync(dir); // 디렉토리가 존재 하는지 확인하고 없으면 만들어줌
        cb(null, dir)
        // 첫번째 파라미터에서는 에러값을 보내야 하는데 에러가 없으니 null
        // 저장될 디렉토리를 위치를 전달
    },
    filename: function(req, file, cb){
        cb(null, uuid() + path.extname(file.originalname))
    }
});

var upload = multer({
    storage: storage,
    limits: {
        filesize : 314572800, // 바이트 기준 300MB
        files : 1 // 파일 갯수
    },
    // 어느 파일을 업로드할지,
    // 혹은 건너뛸지 제어할 수 있게 함수에 설정합니다.
    fileFilter: function(req, file, cb){
        if(file.mimetype.indexOf('image/') !== -1){
            //이 파일을 허용하려면 다음과 같이 'true'를 전달합니다.
            cb(null, true);
        }else{
            // 무언가 문제가 생겼다면 언제나 에러를 전달할 수 있습니다.
            cb(null, false);
            cb(new Error('이미지 형식의 파일이 아닙니다'))
        }
    }
}).single('profile')

// .single(), .array(), fields(), any()

// .single(fieldname)
// fieldname 인자에 명시된 이름의 단수 파일을 전달 받습니다. 
// 이 파일은 <<<req.file>>> 에 저장될 것 입니다.

// .array(fieldname[, maxCount])    //upload.array('attach', 2)
// fieldname 인자에 명시된 이름의 파일 전부를 배열 형태로 전달 받습니다. 
// 선택적으로 maxCount 에 명시된 값 이상의 파일이 업로드 될 경우 에러를 출력할 수 있습니다. 
// 전달 된 배열 형태의 파일은 <<<req.files>>> 에 저장될 것입니다.

// .fields(fields)
// fields 인자에 명시된 여러 파일을 전달 받습니다. 
// 파일 객체는 배열 형태로 req.files 에 저장될 것입니다.

// fields 는 name 과 maxCount (선택사항) 을 포함하는 객체의 배열이어야 합니다. 

// 예제:
// upload.fields(                                           // multiple도 가능하다는 이야기
//     [{ name: 'attach1', maxCount: 1 }, { name: 'attach2', maxCount: 2 }]
// ), 

// .any()
// 전달된 모든 파일을 허용합니다. 
// 파일 배열은 req.files 에 저장될 것입니다.

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
    upload(req, res, function(err){
        if (err) return next(err);

        var newProfile = {
            origin_name : req.file.originalname,
            system_name : req.file.filename,
            path : PATH_DIR,
        }
        var newUser = {
            id : req.body.id,
            pw : req.body.pw,
            name : req.body.name,
            age : req.body.age,
            gender : req.body.gender,
            address : req.body.address1+" "+req.body.address2
        }
        userDAO.signup(newUser, function(err, userResult){
            newProfile.user_no = userResult.insertId
            userDAO.uploadProfiles(newProfile, function(err, result){
                if (err) return next(err);
                res.redirect('/')
            })
        })
    })
    // 서버에서도 유효성검사 하기
})

// query가 get방식 body가 post방식

router.get('/list', middle.isLogin() ,function(req, res, next){

    var searchObj = {
        search : req.query.search ? req.query.search : null,
        sub : req.query.sub ? req.query.sub : 'id',
        startPoint : 0,
        pageList : 0 
    }

    const pageList = 3; //페이지당 글 리스트 개수
    const blockPage = 5;  // 블록당 페이지 개수

    userDAO.count(searchObj, function(err, result){

        if(err) return next(err)

        var allList = result.count // 총 리스트 개수
        var nowPage = req.query.page ? req.query.page : 1  // 현재 페이지
        var allPage = Math.ceil(allList/pageList) // 총 페이지 수 // ceil은 올림
        var allBlock = Math.ceil(allPage/blockPage) // 총 블록 수
        var nowBlock = Math.ceil(nowPage/blockPage) // 현재 블록
        var firstPage = (nowBlock * blockPage) - (blockPage-1) // 현재 블록의 첫 페이지
        if(firstPage <= 1){ firstPage = 1 } // 시작페이지가 1 이하인경우 1로 초기화
        var lastPage = nowBlock * blockPage // 마지막 페이지
        if(allPage <= lastPage){ lastPage = allPage } // 최대 범위를 넘지 않도록 초기화
        if(nowPage > lastPage){ nowPage = lastPage } // 현재 페이지가 라스트페이지보다 크면 초기화
        var pageObj = {
            allPage : allPage,
            nowPage : nowPage,
            blockPage : blockPage,
            firstPage : firstPage,
            lastPage : lastPage
        }
        searchObj.startPoint = (nowPage-1) * pageList;
        searchObj.pageList = pageList;

        userDAO.list(searchObj, function(err, result){
            if (err) {
                return next(err);
            }
            for(var r of result){
                r.reg_date = moment(r.reg_date).fromNow()
            }
            res.render('user/userList', {
                users : result,
                searchObj : searchObj,
                pageObj : pageObj
            });
        })
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

router.get('/profile', function(req, res, next){
    var filePath = path.join(ROOT_DIR, req.query.path, req.query.filename);
    fs.readFile(filePath, function(err, data){
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.end(data);
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
    // console.log(arr)
    guestBookDAO.updateGuestBook(arr, function(err, result){
        if (err) return next(err);
        return res.json({success:true})
    })
})


router.post("/api_login", function(req, res, next){
    //회원가입 여부 체크
    console.log(req.body)
    userDAO.checkAPi([req.body.id, req.body.type], function(err, check){
        if(err) return next(err);
        if(check.count < 1){
            //회원가입
            userDAO.signupApi(req.body, function(err, result){
                if(err) return next(err);
                //로그인
                userDAO.loginApi([req.body.id, req.body.type], function(err, user){
                    if(err) return next(err);
                    req.session.user = user;
                    return res.json({success:true})
                })            
            })
        }else{
            //로그인
            userDAO.loginApi([req.body.id, req.body.type], function(err, user){
                if(err) return next(err);
                req.session.user = user;
                return res.json({success:true})
            })  
        }
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
