var url = require("url");

var urlObj = url.parse(
// 프로토콜 //ip(domain) // 포트// 디렉토리명 // 파일명 // ?파라미터 
    "http://localhose:10001/list.do?id=aaa&pass=1234", true // json으로 해준다
);

console.log(urlObj);

console.log(urlObj.host);
console.log(urlObj.query.pass);

