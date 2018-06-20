/// 입력 변하는 코드

var ids = ["aaa", "bbb", "ccc", "ddd"]
var pws = ["111", "222", "333", "444"]


var inputId = "ccc"
var inputPw = "111"


////////////////////////////
/// 기능
/////////////////////////////////

for(var i = 0; i < ids.length; i++){
    if(inputId === ids[i] && inputPw === pws[i]){
        console.log(ids[i]+"님 환영합니다.")
    }
}
