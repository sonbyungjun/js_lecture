// url 모듈 : url 정보를 분석해서 처리
var url = require("url");

var urlObj = url.parse(
//프로토콜 //ip(domain)//포트//디렉토리명// 파일명 // 파라미터
    "http://localhost:10001/list.do?id=aaa&pass=1234", true
    //true를 주면 query를 객체로 파싱해준다.
    //false거나 없는경우에는 문자열로 파싱해준다.
);

console.log(urlObj);


console.log(urlObj.query); // { id: 'aaa', pass: '1234' }
console.log(urlObj.query.id); // aaa

// var man = {
//     name : "종인",
//     age : 12,
//     school : {
//         name : "단국",
//         age : 70
//     },
//     sum : function(a,b){
//         console.log(a+b)
//     },
//     family : [
//         { name : "김종이", age : 1, sc : "동생"},
//         { name : "박종인", age : 1, sc : "아내"},
//         { name : "박종인", age : 1, sc : "아내"},
//     ]
// }

// for(f of man.family){
//     if(f.sc == "동생")
//         console.log(f)
// }