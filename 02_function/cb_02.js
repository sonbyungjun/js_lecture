




function sum(a, b){
    var result = a + b
    return function(val){
        console.log("결과 : "+ (val + result))
    
    }
}

sum(1, 4)(100)


