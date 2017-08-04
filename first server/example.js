'use strict'

var fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');

var root = path.resolve(process.argv[2] || '.');   //argv当前进程命令行参数数组
console.log('Static root dir: ' + root);

//创建服务器
var server = http.createServer(function(request, response) {
    // 获得URL的path，类似 '/css/bootstrap.css':
    var pathname = url.parse(request.url).pathname;
    // 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
    var filepath = path.join(root, pathname);
    //获取文件状态
    fs.stat(filepath, function(err, stats){
        if(!err && stats.isFile()) {
            console.log('200' + request.url);
            //200
            response.writeHead(200);
            //文件流向response
            fs.createReadStream(filepath).pipe(response);
        } else {
            //出错
            console.log('404' + request.url);
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
}).listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');