module.exports =  {
    
    isLogin : function(){
        return function (req, res, next){
            if(req.session.user) {
                return next();
            } else {
                // return res.status(401).json({
                    //     success: false,
                    //     message: 'Unauthorized'
                // });
                res.writeHead(401, {"Content-Type" : "text/html; charset=utf-8"})
                res.end(`<script>
                            alert("로그인 해주세요")
                            location.href = '/user/login'
                        </script>`)
            }
        }
    },

    isMine : function(){
        return function(req, res, next){

            if(!req.session.user) {
                res.writeHead(401, {"Content-Type" : "text/html; charset=utf-8"})
                res.end(`<script>
                            alert("로그인 해주세요")
                            location.href = '/user/login'
                        </script>`)
            }

            var no = req.query.no ? req.query.no : req.body.no
            if(no == req.session.user.no){
                return next();
            }else{
                res.writeHead(401, {"Content-Type" : "text/html; charset=utf-8"})
                res.end(`<script>
                            alert("본인의 글이 아닙니다.")
                            window.history.back()
                        </script>`)
            }
        }
    },

    isMineGuestbook : function(){
        return function(req, res, next){

            if(!req.session.user) {
                res.writeHead(401, {"Content-Type" : "text/html; charset=utf-8"})
                res.end(`<script>
                            alert("로그인 해주세요")
                            location.href = '/user/login'
                        </script>`)
            }

            var writer_no = req.query.writer_no ? req.query.writer_no : req.body.writer_no
            if(writer_no == req.session.user.no){
                return next();
            }else{
                res.writeHead(401, {"Content-Type" : "text/html; charset=utf-8"})
                res.end(`<script>
                            alert("본인의 댓글이 아닙니다.")
                            window.history.back()
                        </script>`)
            }
        }
    }

        // isMine : function(writer){
        //     // 로그인이 되어있냐

        //     // 로그인이 되어 있다면
        //     // 해당하는 글의 작성자와 // 내 로그인 상태 id와 같냐
        // }
}