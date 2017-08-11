var http = require('http');

http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type': 'text-plain'});
    response.end('Hello World\n');
}).listen(8124);

//创建一个 HTTP 服务器监听 8124 端口
//浏览器访问 http://127.0.0.1:8124/ 可以看到效果