

// 2항연산



function sum(num1, num2, sum){
    if(sum === "+"){
        var a = num1+num2
        console.log(num1 + "+" + num2 + "=" + a)
    }else if(sum === "-"){
        var b = num1-num2
        console.log(num1 + "-" + num2 + "=" + b)
    }else if(sum === "/"){
        var c = num1/num2       
        console.log(num1 + "/" + num2 + "=" + c)
    }else if(sum === "*"){
        var d = num1*num2        
        console.log(num1 + "*" + num2 + "=" + d)
    }else{
        console.log("잘못 입력 하셨습니다.")    
    }
}

sum(1, 2, "+")
