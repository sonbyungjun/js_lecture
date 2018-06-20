// 비동기적 파일 쓰기

var fs = require("fs");

var msg = "파일 쓰기 테스트 입니당~";

fs.writeFile("./backup3.txt", msg, "utf-8", function(err){
    if(err){
        console.log("쓰기 중 에러 발생");
        console.log(err);
        return;
    }
    console.log("비동기 파일 쓰기 성공");
});

// 동기적 파일 쓰기
try{
    // 무언가 시도
    fs.writeFileSync("./backup4.txt", msg, {encoding: "utf-8"});
    console.log("동기적 파일 읽기 성공")
}catch(err){
    // try 실행했을때 에러가 났을때 바로 catch로 오고 에러정보가 저장됨.
    console.log("읽기 중 에러 발생");
    console.log(err);
}
