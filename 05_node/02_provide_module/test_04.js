// crypto : 해쉬 생성 및 암호화 처리
// 해싱 : 암호화 하는 알고리즘 방법

var crypto = require("crypto");

// 해쉬 알고리즘 : sha1 , md5 , sha256 , sha512

//해쉬를 생성
var sha1 = crypto.createHash("sha1");


// 암호화 할 문자열 => (평문)
var msg = "abc1234";

//등록
sha1.update(msg);


// 실제 암호화
var output = sha1.digest("base64"); //base64

console.log(output)