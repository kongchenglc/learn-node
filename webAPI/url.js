var http = require('http');
var url = require('url');

var obj = url.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash', true);
//.parse方法还支持第二个和第三个布尔类型可选参数。
//第二个参数等于true时，该方法返回的URL对象中，query字段不再是一个字符串，而是一个经过querystring模块转换后的参数对象。
//第三个参数等于true时，该方法可以正确解析不带协议头的URL，例如//www.example.com/foo/bar。
console.log(obj);

//用format方法将url对象转换为url字符串
console.log(url.format(obj));


http.createServer(function(request, response) {
    var tmp = request.url;
    var obj = url.parse(tmp);
    console.log(obj);
}).listen(80);