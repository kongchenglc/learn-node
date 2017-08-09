var bin = new Buffer([0x68, 0x65, 0x6c, 0x6c, 0x6f]);  //缓冲区的操作类似于数组
var str = bin.toString('utf-8');            //缓冲区内容向数组转化
console.log(str);
var bin2 = new Buffer('hello', 'utf-8');    //根据字符串转换成为缓冲区
var bin3 = new Buffer(bin);                 //开辟新空间并复制缓冲区内容
console.log(bin.length);                //5
var bin4 = new Buffer(bin.length);          //开辟制定长度空间
bin.copy(bin4);                             //复制内容
bin4[0] = 0x65;                             //改变制定位置内容
str = bin4.toString('utf-8');               
console.log(str);
console.log(bin);
console.log(bin2);
console.log(bin3);
console.log(bin4);