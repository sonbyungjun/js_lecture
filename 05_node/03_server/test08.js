const http = require("http");
const url = require("url");
var fs = require("fs");

http.createServer(function(req, res){// 첫번째는 요청, 두번째는 응답
    console.log(req.url)
    
    if(req.url == "/favicon.ico" || req.url == "/jquery.js"){
        res.end();
        return;
    }

    if(req.method == "GET"){
        fs.readFile("./data/test.html", "utf-8", function(err, body){
            res.writeHead(
                200, {"Content-Type":"text/html; charset=utf-8"}
            );
            res.end(body);
        })
    }



}).listen(3000, function(){
    console.log("서버 구동중...")
})