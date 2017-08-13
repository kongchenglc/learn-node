//sync
var len = arr.length,
    i = 0;

for (; i < len; ++i) {
    arr[i] = sync(arr[i]);  // 所有数组项都已处理
}

//async
(function next(i, len, callback) {
    if (i < len) {              //所有数组项处理完之后调用回调函数
        async(arr[i], function (value) {
            arr[i] = value;
            next(i + 1, len, callback);
        });
    } else {
        callback();
    }
}(0, arr.length, function () {
    // 所有数组项都已处理
}));


//async所有数组成员并行处理
(function (i, len, count, callback) {
    for (; i < len; ++i) {
        (function (i) {
            async(arr[i], function (value) {
                arr[i] = value;
                if (++count === len) {
                    callback();
                }
            });
        }(i));
    }
}(0, arr.length, 0, function () {
    // 所有数组项都已处理
}));