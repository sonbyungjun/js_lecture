const http = require("http");
const port = 3000;
const server = http.createServer(function(req, res){// 첫번째는 요청, 두번째는 응답
    console.log("사용자 요청이 들어옴..");
    //end 내용을 반환하면서 끝낸다.
    res.end(`
    <h1>Hello World!</h1>
    <button>안녕</button>
    `)// 그레이브엑센트(띄어쓰기 가능)
});

server.listen(port);
// 서버를 3000포트로 구동시켜주고 계속 보고있다.
console.log("서버 구동중...");

