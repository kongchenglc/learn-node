var path = require('path');
var cache = {};

function store(key, value) {
    cache[path.normalize(key)] = value;     //将传入的路径转换为标准路径
}

store('foo/bar', 1);
store('foo//baz//../bar', 2);
console.log(cache);  // => { "foo/bar": 2 }

var a = path.join("father\\", 'foo/bar');       //多个路径拼接为标准路径
console.log(a);

console.log(path.extname('foo/bar.js'));