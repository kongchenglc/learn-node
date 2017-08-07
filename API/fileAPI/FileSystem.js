var fs = require('fs');

fs.readFile('./new.txt', (err, data) => {       //异步读文件
    if(err) {
        console.log(err.message);
    } else {
        console.log(data);
        data = data.toString('utf-8');
        console.log(data);
    }
});

try {
    var data = fs.readdirSync('./new.txt');     //同步读文件：异常与执行结果的传递方式有所变化
} catch(err) {
    console.log(err.message);
}