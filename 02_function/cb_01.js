




function sum(a, b, cb){
    var result = a + b
    cb(result)
    cb(result+100)
}


// var print = function(data){
//     console.log("결과 : "+data)
// }

sum(1, 4, function(data){
    console.log("결과 : "+data)
})


