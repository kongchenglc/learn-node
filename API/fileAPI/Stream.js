//一个类似于.pipe方法的内部实现
var fs = require('fs');

var rs = fs.createReadStream("./utf-8txt.txt");
var ws = fs.createWriteStream("./new.txt");

rs.on('data', (chunk) => {
    if(ws.write(chunk) != true) {
        rs.pause();                 //防止读取快于写入而爆仓
    }
});

ws.on('drain', () => rs.resume());  //继续

rs.on('end', () => ws.end());       //结束