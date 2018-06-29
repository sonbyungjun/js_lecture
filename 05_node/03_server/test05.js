const http = require("http");
const url = require("url");
const port = 3000;

const server = http.createServer(function(req, res){// 첫번째는 요청, 두번째는 응답
    var urlObj = url.parse(
        req.url , true
    )

    res.writeHead(
        200, {"Content-Type":"text/html; charset=utf-8"}
    )
    //그레이브엑센트 안에 ${urlObj.pathname} 로쓰면 변수 사용가능
    var str = `<h1>요청 URI : ${urlObj.pathname}</h1>
                <h1>파라미터 리스트</h1>`;
    for(var i in urlObj.query){
        str += `<h1>${i}=${urlObj.query[i]}</h1>`; 
    }
    res.write(str);
    res.end();
});

server.listen(port, function(){
    console.log("서버 구동중...");
});