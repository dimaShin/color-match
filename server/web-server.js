console.log('starting http server');
var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(80);

function handler (req, res) {

    var url = req.url;
    var mimeTypes = {
        js: 'text/javascript',
        css: 'text/css',
        gif: 'image/gif',
        png: 'image/png',
        html: 'text/html',
        ogg: 'audio/ogg'
    };
    //if(url.match(/favicon/)) return;
    if(!url.match(/\.\w{1,4}$/i)){
        url = 'index.html';
    }else{
        url = url.substr(1);
        var dotIndex = url.lastIndexOf('.') + 1;
        if(dotIndex !== 0){
            var ext  = url.substr(dotIndex);
            //if(ext === 'map') return;
            var mimeType = mimeTypes[ext];
            if(!mimeType) mimeType = 'text/plain';
        }

    }
    console.log('got req: ', url);
    fs.readFile(url,
        function (err, data) {
            if (err) {
                console.log('err: ', err);
                res.writeHead(500);
                return res.end('Error loading ');
            }
            res.writeHead(200, {
                'Content-type': mimeType,
                'Content-length': data.length
            });
            res.end(data);
        });
}
io.on('connection', function(socket){
    console.log('new socket');
    socket.on('animation', function(timestamp){
        console.log('animation starts at ', timestamp);
    })
})
