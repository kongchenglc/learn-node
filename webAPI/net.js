//net模块创建Socket服务器或Socket客户端

//使用Socket搭建一个固定返回的HTTP服务器
var net = require('net');
net.createServer(function(conn) {
    conn.on('data', function(data) {
        conn.write([
            'HTTP/1.1 200 OK',
            'Content-Type: text/plain',
            'Content-Length: 11',
            '',
            'Hello World'
        ].join('\n'));
    });
}).listen(80);


//使用Socket发起HTTP客户端请求
var options = {
    port: 80,
    host: '127.0.0.1'
};

var client = net.connect(options, function() {
    client.write([
        'GET / HTTP/1.1',
        'User-Agent: curl/7.26.0',
        'Host: www.baidu.com',
        'Accept: */*',
        '',
        '' 
    ].join('\n'));
});

client.on('data', function(data) {
    console.log(data.toString());
    client.end();
});
