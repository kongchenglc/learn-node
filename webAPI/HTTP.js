var  http = require('http');


//服务
http.createServer(function(request, response) {
    var body = [];

    console.log(request.method);
    console.log(request.headers);
    
    request.on('data', function(chunk) {
        body.push(chunk);                   //将接收到的信息加入请求体
        console.log(chunk);
    });

    request.on('end', function() {
        body = Buffer.concat(body);         //拼接信息
        console.log("requestBody = " + body.toString('utf8') + "\n");                  //输出请求体
    });

    response.writeHead(200);
    response.end("accept,over!");
}).listen(80);


//请求1
var options = {
    hostname: '127.0.0.1',                                          //主机名
    port: 80,
    path: '/upload',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

//创建一个http请求，在接收到完整的服务端响应头时调用回调函数
var request = http.request(options, function(response) {
//可以使用response对象访问响应头和响应体
    var body = [];
    console.log("response.statusCode = " + response.statusCode);
    console.log(response.headers);

    response.on('data', function(chunk) {
        body.push(chunk);
        console.log(chunk);                         //得到数据为二进制数据类型
    });

    response.on('end', function() {
        body = Buffer.concat(body);
        console.log(body.toString());
    });
});

request.write('hello world');                       //请求参数
request.end();


//请求2
http.get('http://127.0.0.1/', function(response) { });              //http模块提供的便捷的API
