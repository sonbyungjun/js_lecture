module.exports = {
    isLogin : function(){
        return function(req, res, next){
            if(req.session.user){
                return next();
            }else{
                // return res.status(401).json({
                //     success : false,
                //     message : 'Unauthorized' //인증되지않음
                // });
                res.writeHead(401, {"Content-Type" : "text/html; charset=utf-8"})
                res.end(`<script>
                            alert("로그인 해주세요")
                            window.history.back();
                        </script>`)
            }
        }
    },

    isMine : function(){
        // 로그인이 되어있냐

        // 로그인이 되어있다면
        // 해당하는 글의 작성자와 // 내 로그인 상태 id와 같냐
        // 같으면 보여주고
        // 틀리면 에러.
    }
}