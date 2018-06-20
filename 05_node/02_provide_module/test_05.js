// fs : 파일을 읽거나 쓰거나 할 때 사용
// Sync가 붙은 함수 => 동기적인 함수
// 안붙은거는 비동기 함수


var fs = require("fs");

// 비동기적 파일 읽기
// 경로, 옵션, 파일 다 읽은 후 콜백함수(에러시, 읽어온데이터)
fs.readFile("./text.txt", "utf-8", function(err, data){
    if(err){
        console.log("읽기 중 에러 발생");
        console.log(err);
        return;
    }
    console.log("비동기 파일 읽기 성공");
    console.log(data);
})

////////////////////////////////////////////////////

try{
    // 무언가 시도
    var data = fs.readFileSync("./tssext.txt", {encoding: "utf-8"});
    console.log("동기적 파일 읽기 성공")
    console.log(data);
}catch(err){
    // try 실행했을때 에러가 났을때 바로 catch로 오고 에러정보가 저장됨.
    console.log("읽기 중 에러 발생");
    console.log(err);
}