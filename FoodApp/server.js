// we are going to make our sever without using express onyly i=using nodejs

const http = require("http");
const fs = require('fs');
const _ = require("lodash");

const server = http.createServer((req,res)=>{
        console.log("Request has been sent by browser to server")
        // console.log(req);
        // console.log(req.url);
        // res.setHeader('Content-Type','text/html');
        // res.write("<h1>Hello Raghav</h1>");
        // res.end();
        
        //lodahs
        let num = _.random(0,20);
        console.log(num);

        let greet=_.once(()=>{
            console.log("Hello Everyone")});
        greet();
        greet();
        //reading multiple files

        let path = "./views";
        switch(req.url){
            case "/":
                path+='/index.html';
                res.statusCode = 200;
                break;
            case "/about":
                path+='/about.html';
                res.statusCode = 200;
                break;
            case "/about-abc":
                res.setHeader('Location','/about');
                res.statusCode = 301;
                res.end();
                break;
            default:
                path+='/404.html';
                res.statusCode = 404;
                break;
        };
        fs.readFile(path,(err,filedata)=>{
            if(err) console.log(err);
            else 
            
            res.end(filedata);
        })
})

//local host is also known as loop back ip adress

server.listen(3000,'localhost',()=>{
    console.log("Server is listening on port 3000");
})