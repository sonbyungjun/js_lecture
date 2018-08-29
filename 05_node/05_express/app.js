var express = require('express');
var bodyParser = require('body-parser')

var app = express();
var path = require('path');
var cookieParser = require('cookie-parser')
var session = require('express-session')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static("./publics"));

app.use(cookieParser())
app.use(session({
	secret: '@#@$MYSIGN#@$#$',
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 365	// 쿠키 유효기간 1년
	},
}));

var userDAO = require('./models/dao/userDAO');
app.use(function(req, res, next){
	if(req.cookies.token){	// token 이라는 쿠키가 존재하면
		userDAO.checkToken(req.cookies.token, function(err, result){	// 로그인 유지 토큰이 있는지 확인
			if (err){
				res.locals.user = ''
				return next(err);
			}
			req.session.user = result	// 로그인 유지니깐 세션에도 담고
			res.locals.user = result		// 전역에 랜더링 해야하니 locals에도 담는다.
			return next()
		})
	}else{	// 쿠키가 없으면
		if(req.session.user) res.locals.user = req.session.user	//쿠키는 없지만 세션이 있으면
		else res.locals.user = ''
		return next()
	}
});

var index = require("./routes/index");
var user = require("./routes/user");
var board = require("./routes/board");
app.use("/", index);
app.use("/user", user);
app.use("/board", board);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// error 처리...
// err 파라미터가 있으면 다른 미들웨어는 건너 뛰고 바로 이 미들웨어로 온다.
app.use(function (err, req, res, next) {
	res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"})
	console.error(err);
	res.end("<h1>오류!</h1>")
});

app.listen(8001, function () {
  console.log('8001번 포트 구동중...');
});