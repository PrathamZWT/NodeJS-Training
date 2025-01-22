
const http = require("http");
const fs = require('fs');
const url = require('url');
const fileNameArray  = require("./file");



const myServer = http.createServer((req,res)=>{
    const myUrl = url.parse(req.url,true);
    switch (myUrl.pathname) {
        case "/":
            console.log(typeof(fileNameArray));
            fileNameArray.forEach(file =>{
                res.write("\n" + file);
            })


        default:
            res.end("404 - Page Not Found");
            break;
    }
}).listen(8000,()=>{
    console.log("server is active");
    
});

