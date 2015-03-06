/**
 * Created by xie on 2015/2/20.
 */
var express = require('express');
var app = express();

// simple logger
app.use(function(req, res, next){
    console.log('%s %s', req.method, req.url);
    next();
});

// respond
app.use(function(req, res, next){
   /* res.send('Hello World');*/
    console.log("second filter");
    next();
});

app.get('/api', function (req,res,next) {
    console.log("aaaaa");
    res.send("hello");
});

app.listen(3000);