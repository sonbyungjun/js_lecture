/*
        모듈을 가져오기 위해서 require을 사용
        require 함수 호출시 해당 모듈 파일의 exports객체를 반환받는다.
*/



var cal = require("./module_02.js")

console.log(cal)

console.log(cal.add(100,200));
console.log(cal.sub(100,200));
console.log(cal.name + "님");