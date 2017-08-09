//遍历目录

//异步读取目录
var fs = require('fs');
var path = require('path');
function travelAsync(dir, callback, finish) {           //传入目录，读到文件时的回调函数，结束时执行函数
    fs.readdir(dir, function(err, files) {              //给fs.readdir传入目录和回调函数
        (function next(i) {                             //fs.readdir读好文件就会回调执行 
            if(i < files.length) {
                var pathname = path.join(dir, files[i]);

                fs.stat(pathname, function(err, stats) {//又一个异步回调
                    if(stats.isDirectory()) {           //如果依然是一个目录，再次调用travelAsync函数
                        travelAsync(pathname, callback, function() {
                            next(i + 1);                //遍历dir的子目录的下一个目录
                        });
                    } else {
                        callback(pathname, function() { //找到文件就执行回调函数
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

