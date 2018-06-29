const http = require("http");
const port = 3000;
const server = http.createServer(function(){
    console.log("사용자 요청이 들어옴..");
});

server.listen(port);
// 서버를 3000포트로 구동시켜주고 계속 보고있다.
console.log("서버 구동중...");

