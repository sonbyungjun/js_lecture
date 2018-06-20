console.log("콘솔에 직는 것")






var msg = ("날씨 서울");


try{
    if(msg.indexOf("@날씨")!=-1){
        var u = Utils.getWebText("https://m.search.naver.com/search.naver?query="+msg.split("@날씨")[1]+"날씨")
        var t = u.split("<em class=\"figure degree_code\">")[1].split("<")[0] // 현재온도
        var bt = u.split("<em class=\"figure degree_code\">")[2].split("<")[0] // 체감온도
        var w = u.split("<div class=\"wt_summary\">")[1].split("</p>")[0].replace(/[^가-힣,]/g,"") // 날씨 상태
        var h = u.split("<span class=\"percent\">")[1].split("<")[0] // 습도
        if(u.indexOf("<em class=\"figure sign1\">")!=-1){
        var d = u.split("<em class=\"figure sign1\">")[1].split("</span>")[0].replace(/(<[^>]+>)/g,"") // 미세먼지
        } else {
        var d = u.split("<em class=\"figure sign2\">")[1].split("</span>")[0].replace(/(<[^>]+>)/g,"") // 미세먼지
        }
        var uv = u.split("</strong> <span>")[1].split("<")[0] // 자외선
        replier.reply("["+msg.split("날씨")[0]+" 날씨 결과]\n"+"현재온도: "+t+"°C\n체감온도: "+bt+"°C\n"+w+"\n습도: "+h+"%\n미세먼지: "+d+"\n자외선: "+uv)
    }
    } catch(e) {
        return
    }
