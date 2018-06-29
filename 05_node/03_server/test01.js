var http = require("http");

//http 통신을 하게 만들어줌.

const port = 3000;

var server = http.createServer();

server.on("request", function(){
    console.log("사용자 요청이 들어옴...");
})


server.listen(port);
// 서버를 3000포트로 구동시켜주고 계속 보고있다.
console.log("서버 구동중...");

