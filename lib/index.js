#!/usr/bin/env node
'use strict';

var path = require('path');
var glob = require('glob');
var fs = require('fs');
var args = process.argv.slice(2);
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
        var regs = /http(s?)\:\/\/ggtf\.sunland\.org\.cn\/statistics\/sunlandsLog\.js/g;
        if (args.indexOf('isbd') != -1) {
            vtrHtml = vtrHtml.replace(rgx, 'https://www.sunlands.wang/wtm.js');
            vtrHtml = vtrHtml.replace(regs, 'https://b.bdstatic.com/searchbox/icms/searchbox/js/swan-1.6.0.js');
        } else {
            vtrHtml = vtrHtml.replace(rgx, 'https://img.sunlands.wang/wtm.js');
            vtrHtml = vtrHtml.replace(regs, 'https://res.wx.qq.com/open/js/jweixin-1.3.2.js');
        }
        fs.writeFileSync('./index.html', vtrHtml, 'utf8');
    });
});