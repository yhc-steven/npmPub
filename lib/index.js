#!/usr/bin/env node
'use strict';

var path = require('path');
var glob = require('glob');
var fs = require('fs');
function getHtml() {
    var arr = [];
    return new Promise(function (resolve, reject) {
        glob('./**/index.html', function (err, files) {
            resolve(files);
        });
    });
}
getHtml().then(function (files) {
    files.forEach(function (url) {
        var vtrHtml = fs.readFileSync(url, 'utf8');
        var rgx = /http(s?)\:\/\/ggtf\.sunland\.org\.cn\/statistics\/interactive\.js/g;
        vtrHtml = vtrHtml.replace(rgx, '');
        fs.writeFileSync('./index.html', vtrHtml, 'utf8');
        console.log(ifbd);
    });
});