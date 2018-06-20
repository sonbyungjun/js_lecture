
// 2항연산

var num1 = 42
var num2 = 31
var sum1 = "*"

function sum(num1, num2, sum1){
    if(sum1 === "+"){
        var a = num1+num2
        return a
    }else if(sum1 === "-"){
        var b = num1-num2
        return b       
    }else if(sum1 === "/"){
        var c = num1/num2      
        return c
    }else if(sum1 === "*"){
        var d = num1*num2  
        return d
    }else{
        console.log("잘못 입력 하셨습니다.")    
    }
}

var aa = sum(num1, num2, sum1)

console.log(num1 + sum1 + num2 + "=" + aa)