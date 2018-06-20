/*

모듈만들기

재활용 가능한 기능이나 객체를 별도의 파일로 분리시키고 필요한 위치에
재사용가능하게 하기 위해서

분리된 함수나 객체들의 묶음을 모듈(module)이라 부른다.

모듈 파일 정의
test_module.js

모듈 정의시 처리할 일
사용자 정의 모듈은 module.exports 객체에 대입해서 만든다.


모듈 사용
test01.js

require("모듈파일명")


*/

function add (i, j){
    return i + j;
}

function sub (i, j){
    return i - j;
}

var name = "손병준"

module.exports.add = add; //add function
module.exports.sub = sub; //sub function
module.exports.name = name;


