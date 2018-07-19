var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session')
var cookieParser = require('cookie-parser')

//무조건 들어가야되는 부분
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static("./publics"));

app.use(cookieParser());
app.use(session({
  secret: '5#%d53!d',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24// 쿠키 유효기간 하루
  }
}));

app.use(function(req, res, next){
    if(req.session.user){
      // locals은 모든 전역에 응답해줌.
      res.locals.user = req.session.user
    }else{
      res.locals.user = ''
    }
    next()
});

var user = require("./routes/user");
var index = require("./routes/index");
app.use("/", index);
app.use("/user", user);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//error 처리...
//err 파라미터가 있으면 다른 미들웨어는 건너 뛰고 바로 이 미들웨어로 온다.
app.use(function(err, req, res, next){
  res.writeHead(200, {'content-type': 'text/html; charset=UTF-8'})
  console.error(err);
  res.end("<h1>오류!</h1>")
});

app.listen(3000, function () {
  console.log('3000번 포트 구성중...');
});