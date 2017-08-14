//try...catch只能用于同步执行的代码
function sync(fn) {
    return fn();
}

try {
    sync(null);
    // Do something.
} catch (err) {
    console.log('Error: %s', err.message);
}


// //异步函数打断代码执行路径，try捕捉不到错误，出现错误作为全局异常抛出
// function async(fn, callback) {
//     // 代码执行路径在此处中断。
//     setTimeout(function () 　{
//         callback(fn());
//     }, 0);
// }

// try {
//     async(null, function (data) {
//         // Do something.
//     });
// } catch (err) {
//     console.log('Error: %s', err.message);
// }


//node中的API几乎都以这种方式设计，回调函数的第一个参数是err，通过回调函数传递被捕获的异常
function async(fn, callback) {
    // 代码执行路径在此处中断。
    setTimeout(function () {
        try {
            callback(null, fn());
        } catch (err) {
            callback(err);
        }
    }, 0);
}
async(null, function(err,data) {
    if(err) {
        console.log('Error: %s', err.message);
    } else {
        //Do something;
    }
});