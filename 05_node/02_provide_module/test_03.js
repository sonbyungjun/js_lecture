
var qs = require("querystring");

var data = "id=aaaa&pass=1111";

var param = qs.parse(data);
// json 화

console.log(param)