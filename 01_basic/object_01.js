var users = [
    {
        id : "aaa",
        pw : "111",
    },
    {
        id : "bbb",
        pw : "222",
    },
    {
        id : "ccc",
        pw : "333",
    },
    {
        id : "ddd",
        pw : "444",
    }
]

// console.log(users[0].id)

var inputId = "ccc"
var inputPw = "333"

for(var i = 0; i < users.length; i++){
    if(inputId === users[i].id && inputPw === users[i].pw){
        console.log(users[i].id+"님 환영합니다.")
    }
}
