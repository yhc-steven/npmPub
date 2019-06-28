#!/usr/bin/env node
const path = require('path');
const glob = require('glob');
const fs = require('fs');
const args = process.argv.slice(2)
function getHtml() {
    let arr = [];
    return new Promise((resolve,reject)=>{
        glob('./**/index.html', function (err, files) {
            resolve(files);
        })
    })
    
}
getHtml().then(files=>{
    files.forEach(url => {
        let vtrHtml = fs.readFileSync(url, 'utf8')
        var rgx = /http(s?)\:\/\/ggtf\.sunland\.org\.cn\/statistics\/interactive\.js/g;
        var regs = /http(s?)\:\/\/ggtf\.sunland\.org\.cn\/statistics\/sunlandsLog\.js/g;
        if(args.indexOf('isbd')!= -1){
            vtrHtml = vtrHtml.replace(rgx,'https://www.sunlands.wang/wtm.js');
            vtrHtml = vtrHtml.replace(regs,'https://b.bdstatic.com/searchbox/icms/searchbox/js/swan-1.6.0.js');
        }else{
            vtrHtml = vtrHtml.replace(rgx,'https://img.sunlands.wang/wtm.js');
            vtrHtml = vtrHtml.replace(regs,'https://res.wx.qq.com/open/js/jweixin-1.3.2.js');
        }
        fs.writeFileSync('./home.html',vtrHtml,'utf8');
    });
})
