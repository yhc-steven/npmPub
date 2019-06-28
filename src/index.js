#!/usr/bin/env node
const path = require('path');
const glob = require('glob');
const fs = require('fs');
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
        vtrHtml = vtrHtml.replace(rgx,'');
        fs.writeFileSync('./index.html',vtrHtml,'utf8');
        
    });
})
