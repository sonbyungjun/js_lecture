/// 입력 변하는 코드

var users = [
    ["aaa", "111"],
    ["bbb", "222"],
    ["ccc", "333"],
    ["ddd", "444"]
]


var inputId = "ccc"
var inputPw = "333"

// console.log(users[3][0])



////////////////////////////
/// 기능
/////////////////////////////////

for(var i = 0; i < users.length; i++){
    if(inputId === users[i][0] && inputPw === users[i][1]){
        console.log(users[i][0]+"님 환영합니다.")
    }
}
