/// 입력 변하는 코드

var ids = ["aaa", "bbb", "ccc", "ddd"]

var inputId = "ccc"


////////////////////////////
/// 기능
/////////////////////////////////

for(var i = 0; i < ids.length; i++){
    if(inputId === ids[i]){
        console.log(ids[i]+"님 환영합니다.")
    }
}