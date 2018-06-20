var msg = "@날씨 서울"
var msg2 = "김종인,손병준,김종닌,박지성"

var tmp = msg.indexOf("날싸")  // 1  indexOf 는 숫자를 반환 (없으면 -1)
if(tmp == -1){
    console.log("명령어 제대로 입력하세요.")
}else{
    console.log(tmp)
}


console.log(tmp)



var tmp2 = msg.lastIndexOf("날씨")  // 뒤에서부터 찾는것.

console.log(tmp2)

var conut = "@날씨 ".length //4 문자의 갯수
var city = msg.substring(conut) // 문자열을 꺼내는것 substring(1, 4) 1~4문자열 뽑기 substring(4) 4부터 끝까지 뽑기



console.log(city)

var names = msg2.split(",")[1] // split() 안에 기준으로 짤라서 배열로 반환하는것
console.log(names)




var tmp = msg.split("@날씨")[1].trim()
var t = tmp.length
console.log(tmp)
console.log(t)



msg = "날씨 서울" // 날씨 서울
tmp = msg.split("날씨")
city = tmp.indexOf('') === 1 ? tmp[0] : tmp[1] // 3항연산자 (조건?참일때:거짓일때)
console.log(city.trim())

