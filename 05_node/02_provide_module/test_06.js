// 파일 쓰기
var fs = require("fs");

var msg = "파일 쓰기 테스트 입니당~";

fs.writeFile("./backup3.txt", msg, "utf-8", function (err) {
    if(err){
        console.log("쓰기 중 에러 발생");
        console.log(err);
        return;
    }
    console.log("비동기 파일 쓰기 성공");
});


try {
    var data = fs.writeFileSync("./backup4.txt", msg , {encoding: "utf-8"});
    console.log("동기적 파일 쓰기 성공");
    console.log(data);
} catch (err) {
    console.log("쓰기 중 에러 발생");
    console.log(err);
}
