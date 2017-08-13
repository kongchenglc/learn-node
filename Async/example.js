//同步   大量运算会阻塞单线程
function heavyCompute(n, callback) {
    var count = 0,
        i, j;

    for(i = n; i > 0; i--) {
        for(j = n; j > 0; j-- ) {
            count += i;
        }
    }

    callback(count);
}

heavyCompute(10000, function(count) {
    console.log(count);
});

console.log('hello');

//异步
setTimeout(function () {
    console.log('world');
}, 1000);

console.log('hello');


//线程中同步的大量运算运行阻塞异步的回调函数执行
function heavyCompute2(n) {
    var count = 0,
        i, j;

    for (i = n; i > 0; --i) {
        for (j = n; j > 0; --j) {
            count += 1;
        }
    }
}

var t = new Date();

setTimeout(function () {
    console.log(new Date() - t);
}, 1000);

heavyCompute2(50000);