'use strict'

var s = "licheng";
var fs = require('fs');
fs.readFile('./utf-8txt.txt', 'utf-8', function(err, data) {
    if(err) {
        console.log(err);
    } else {
        console.log(data);
    }
});
var c = require('./hello');

c(s);