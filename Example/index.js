var fs = require('fs'),
    path = require('path'),
    http = require('http');

var MIME = {
    '.css': 'text/css',
    '.js': 'application/javascript'
};

function combineFiles(pathnames, callback) {
    var output = [];

    (function next(i, len) {
        if (i < len) {
            fs.readFile(pathnames[i], function (err, data) {
                if (err) {
                    callback(err);
                } else {
                    output.push(data);
                    next(i + 1, len);               //遍历到下一个文件
                }
            });
        } else {
            callback(null, Buffer.concat(output));  //遍历完之后拼接
        }
    }(0, pathnames.length));
}

function parseURL(root, url) {                      //解析地址和参数
    var base, pathnames, parts;
    console.log(root, url);

    if (url.indexOf('??') === -1) {                 //如果不存在??,将第一个/转化为/??以方便分割
        url = url.replace('/', '/??');
    }

    parts = url.split('??');
    base = parts[0];
    console.log(parts);
    pathnames = parts[1].split(',').map(function (value) {
        return path.join(root, base, value);        //将各个文件路径独立出来
    });

    console.log(pathnames);
    return {
        mime: MIME[path.extname(pathnames[0])] || 'text/plain',     //按后缀名得到文件类型
        pathnames: pathnames                        //各个文件的路径组成的数组
    };
}

function main(argv) {
    var config = JSON.parse(fs.readFileSync(argv[0], 'utf-8')),         //解析json配置
        root = config.root || '.',                                      //得到根目录
        port = config.port || 80;                                       //得到监听端口

    http.createServer(function (request, response) {
        var urlInfo = parseURL(root, request.url);                      //调用自定义函数得到对象

        combineFiles(urlInfo.pathnames, function (err, data) {
            if (err) {
                response.writeHead(404);
                response.end(err.message);
            } else {
                response.writeHead(200, {
                    'Content-Type': urlInfo.mime                        //以得到的文件类型发送
                });
                response.end(data);                                     //发送合并后的数据
            }
        });
    }).listen(port);
}

main(process.argv.slice(2));