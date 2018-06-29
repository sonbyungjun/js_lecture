const http = require("http");
const port = 3000;
const server = http.createServer(function(req, res){// 첫번째는 요청, 두번째는 응답
    res.writeHead(
        200, {"Content-Type":"text/html; charset=utf-8"}
    )
    res.write(`<h1>화면에 데이터 보내기</h1>`);
    res.write(`<h1>한글 잘나오나?</h1>`);
    res.end();
});

server.listen(port, function(){
    console.log("서버 구동중...");
});
// 서버를 3000포트로 구동시켜주고 계속 보고있다.

