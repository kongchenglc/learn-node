var fs = require('fs');
var iconv = require('iconv-lite');              //npm安装icon-lite第三方包

function readGBKText(pathname) {
    var bin = fs.readFileSync(pathname);
    return iconv.decode(bin, 'gbk');            //iconv-lite用法
}

var result = readGBKText("./GBK.txt");
console.log(result);