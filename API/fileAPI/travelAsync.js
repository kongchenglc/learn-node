//遍历目录

//异步读取目录
var fs = require('fs');
var path = require('path');
function travelAsync(dir, callback, finish) {           //传入目录，读到文件时的回调函数，结束时执行函数
    fs.readdir(dir, function(err, files) {              //给fs.readdir传入目录和回调函数
        (function next(i) {
            if(i < files.length) {
                var pathname = path.join(dir, files[i]);

                fs.stat(pathname, function(err, stats) {
                    if(stats.isDirectory()) {
                        travelAsync(pathname, callback, function() {
                            next(i + 1);
                        });
                    } else {
                        callback(pathname, function() {
                            next(i + 1);
                        });
                    }
                });
            } else {
                finish && finish();
            }
        })(0); 
    });
}

travelAsync('E:\\Code\\node\\API\\fileAPI', (a, b) => {console.log(a); b();}, () => console.log("finish"));

