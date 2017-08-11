var http = require('http');
var fs = require('fs');

var options = {
    key: fs.readFileSync('./ssl/default.key'),
    cert: fs.readFileSync('./ssl/default.cer')
};

var server = http.createServer(options, function(request, reponse) {
    // 与创建HTTP服务器相比，多了一个options对象
});

server.addContext('foo.com', {                  //可以对不同的域名动态使用不同的证书
    key: fs.readFileSync('./ssl/foo.com.key'),
    cert: fs.readFileSync('./ssl/foo.com.cer')
});

server.addContext('bar.com', {
    key: fs.readFileSync('./ssl.bar.com.key'),
    vert: fs.readFileSync('./ssl/bar.com.cer')
});


//客户端请求
var option = {
    hostname: '127.0.0.1',
    port: 443,
    path: '/',
    method: 'get'
};

var request = http.request(option, function(response) {});
request.end();