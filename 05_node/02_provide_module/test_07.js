/*

request 모듈 : 외부모듈

외부모듈
npm i request

외부모듈 : 외부에서 다운받아서 쓰는 거
npm으로 외부 모듈을 다운
npm : node pakage module

*/

var request = require('request');

//요청하겠다  // 이 주소로    // 요청이 끝나면 실행되는 함수
request('http://www.naver.com', function (err, res, body) {
                                      //에러, 응답, 읽어온 내용
    if(err || res.statusCode != 200){
        console.log('err:', err)
        return;
    };
    console.log("읽어온 내용");
    console.log('body:', body);
});



/*

    url path 로 요청경로를 가공하고
    request 로 우리서버(111.111.111/blog)에 요청하고
    111.111.111에 요청 받으면 borad.html을 (fs)읽어서 뿌려준다

*/