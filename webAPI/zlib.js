var zlib = require('zlib');
var http = require('http');

//服务端服务
http.createServer(function(request, response) {
    data = "这是一段汉字";

    if((request.headers['accept-encoding']||'').indexOf('gzip') !== -1) {
        zlib.gzip(data, function(err, data) {
            response.writeHead( 200, {
                'Content-Type': 'text/plain',
                'Content-Encoding': 'gzip'
            });
            response.end(data);
            console.log('服务端返回压缩文件：\n' + data + '\n');
        });
    } else {
        response.writeHead( 200, {
           'Content-Type': 'text/plain' 
        });
        response.end(data);
        console.log('服务端返回未压缩文件：\n' + data + '\n');
    }
}).listen(80);


//客户端请求
var options = {
    hostname: '127.0.0.1',
    port: 80,
    path: '/',
    method: 'GET',
    headers: {
        'Accept-Encoding': 'gzip, deflate'
    }
};

http.request(options, function (response) {
    var body = [];

    response.on('data', function (chunk) {
        body.push(chunk);
    });

    response.on('end', function () {
        body = Buffer.concat(body);

        if (response.headers['content-encoding'] === 'gzip') {
            zlib.gunzip(body, function (err, data) {
                console.log('客户端解压缩：' + data.toString());
            });
        } else {
            console.log('客户端未解压：' + body.toString());
        }
    });
}).end();