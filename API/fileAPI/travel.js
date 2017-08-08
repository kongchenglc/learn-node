//遍历目录

//同步读取目录
var fs = require('fs');
var path = require('path');

function travel(dir, callback) {
    fs.readdirSync(dir).forEach(function(file) {
        var pathname = path.join(dir, file);            //对目录和文件名进行拼接
        if(fs.statSync(pathname).isDirectory()) {
            travel(pathname, callback);                 //对子目录进行遍历
        } else {
            callback(file);                             //如果不是目录输出文件名
        }
    })
}

travel('E:\\Code\\node\\API\\fileAPI', (a) => {console.log(a)});
