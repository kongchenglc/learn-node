var fs = require('fs');
function copy(src, dst) {
    fs.writeFileSync(dst, fs.readFileSync(src));
}
function main(argv) {
    console.log(process.argv[0], process.argv[1]);
    copy(argv[0], argv[1]);
}
main(process.argv.slice(2));
//从命令行参数截取第2位之后的参数
//argv[0]固定为NodeJS执行程序的绝对路径
//argv[1]固定为主模块的绝对路径