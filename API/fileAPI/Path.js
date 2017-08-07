var path = require('path');
var cache = {};

function store(key, value) {
    cache[path.normalize(key)] = value;     //将传入的路径转换为标准路径
}

store('foo/bar', 1);
store('foo//baz//../bar', 2);
console.log(cache);  // => { "foo/bar": 2 }