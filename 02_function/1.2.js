
// 3항연산 

var num1 = 42
var sum1 = "+"
var num2 = 31
var sum2 = "*"
var num3 = 123

function suma(num1, num2, sum1){
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
        console.log("첫번째 연산자를 잘못 입력 하셨습니다.")    
    }
}

var aa = suma(num1, num2, sum1)

function sumb(aa, num3, sum2){
    if(sum2 === "+"){
        var a = aa+num3
        return a
    }else if(sum2 === "-"){
        var b = aa-num3
        return b       
    }else if(sum2 === "/"){
        var c = aa/num3      
        return c
    }else if(sum2 === "*"){
        var d = aa*num3  
        return d
    }else{
        console.log("두번째 연산자를 잘못 입력 하셨습니다.")
    }
}

var bb = sumb(aa, num3, sum2)


console.log(num1 + sum1 + num2 + sum2 + num3 + "=" + bb)