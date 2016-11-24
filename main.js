/**
 * Created by lichun on 2016/11/24.
 */
var express = require('express');
var http = require('http');

var app = express();

app.use(function (req, resp, next) {
    if(~req.originalUrl.indexOf('/qiuxian/ajax')){
        forwardInteceptHttp(req, resp, 'tuohuang.yiliansj.com', '106.75.133.114')
    }else {
        forwardNoInteceptHttp(req, resp, 'tuohuang.yiliansj.com', '106.75.133.114')
    }
});

app.listen(80, function (err) {
    if (err) {
        console.log(err);
        return
    }
    console.log('Listening at http://localhost:' + 80 + '\n')
});



function forwardInteceptHttp(req, res, host, ip, port, endPath) {
    delete req.headers['accept-encoding'];
    host && (req.headers['host'] = host);
    var clientRequest = http.request({
        host: ip,
        port: port || 80,
        method: req.method,
        path: endPath || req.originalUrl,
        headers: req.headers
    }, function (resp) {
        var chunks = [];
        resp.on('data', function (chunk) {
            chunks.push(chunk)
        }).on('end', function () {
            var data = Buffer.concat(chunks);
            var sendData;
            sendData = data;

            res.writeHead(resp.statusCode, resp.headers);
            //---------------------------------begin
            var json = JSON.parse(sendData.toString('utf8'))
            if(~req.originalUrl.indexOf('=pf')){
                console.log(json)
                json.data.enemyblood = 100
                json.data.setNum = 1
                console.log(json)
            }
            res.end(JSON.stringify(json));
            //---------------------------------end
        })
    });
    if(req.method === 'POST'){
        (function () {
            var chunks = [];
            req.on('data', function (data) {
                chunks.push(data);
            }).on('end', function () {
                var data = Buffer.concat(chunks);

                console.log(data.toString('utf8'))


                clientRequest.end(data);
            })
        })();
    }else {//get
        clientRequest.end();
    }
    clientRequest.on('error', function (e) {
        console.log('转发错误，错误信息：'+e.message)
    })
}

function forwardNoInteceptHttp(req, res, host, ip, port, endPath) {
    delete req.headers['accept-encoding'];
    host && (req.headers['host'] = host);
    var clientRequest = http.request({
        host: ip,
        port: port || 80,
        method: req.method,
        path: endPath || req.originalUrl,
        headers: req.headers
    }, function (resp) {
        var chunks = [];
        resp.on('data', function (chunk) {
            chunks.push(chunk)
        }).on('end', function () {
            var data = Buffer.concat(chunks);
            var sendData;
            sendData = data;

            res.writeHead(resp.statusCode, resp.headers);
           /* //---------------------------------begin
            var json = JSON.parse(sendData.toString('utf8'))
            if(~req.originalUrl.indexOf('=pf')){
                console.log(json)
                json.data.enemyblood = 100
                console.log(json)
            }
            res.end(JSON.stringify(json));
            //---------------------------------end*/

            res.end(sendData)
        })
    });
    if(req.method === 'POST'){
        (function () {
            var chunks = [];
            req.on('data', function (data) {
                chunks.push(data);
            }).on('end', function () {
                var data = Buffer.concat(chunks);

                console.log(data.toString('utf8'))

                clientRequest.end(data);
            })
        })();
    }else {//get
        clientRequest.end();
    }
    clientRequest.on('error', function (e) {
        console.log('转发错误，错误信息：'+e.message)
    })
}