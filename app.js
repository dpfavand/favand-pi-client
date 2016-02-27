// Configuration settings. Could be changed based on environment.
var config  = require('./config');

// http and socket.io server and client
var app     = require('express')();
var server  = require('socket.io-client')(config.socketServer);
var http    = require('http').Server(app);
var io      = require('socket.io')(http);
// var fs      = require('fs'); // for the old file-based image system
// var child   = require('child_process'); // for the first attempt at stream-based system
var PythonShell = require('python-shell');

// automatic update routines
var updateControl       = require('./updatecontrol.js').init(server);

// using socket as the client to the main server
// using io as the local server

http.listen(config.clientport, function(){
    console.log('Listening for connections');
})

server.on('connect', function(){
    console.log('connected to server');
    serverUpdateLoop();
})

io.on('connection', function(socket){
    sendImage(socket)
})

var pyOpts = {
    mode: 'binary'
}

var py = new PythonShell('camera.py', pyOpts);

py.on('close', function(message){
    console.log(py.stdout);
});














function sendImage(connection){
    
    /* semi-working PythonShell version
    PythonShell.run('camera.py', function(err, results){
        if (err) throw err;
        console.log('RESULTS', results.length);
    })
    */
    /* first attempt at stream-based system
     var python = child.spawn('python3', [ __dirname+'camera.py' ]);
    var chunk = '';
    python.stdout.on('data', function(data){
        chunk += data;
    })
    python.stdout.on('close', function(){
        console.log('closed');
        console.log(chunk);
        connection.emit('image', {image: true, buffer: 'data:image/jpeg;base64,' + chunk.toString('base64')});
    })
    */
    /* old code to read from a file
    fs.readFile(config.camerajpeg, function(err, buf){
        if (err) {
            server.emit('pi_error', err)
            console.error(err);
        } else {
            connection.emit('image', {image: true, buffer: 'data:image/jpeg;base64,' + buf.toString('base64')});   
        }    
    }); 
    */
}

function serverUpdateLoop() {
    if(server.connected){
        sendImage(server);
        setTimeout(serverUpdateLoop, 1 * 1000);    
    }
    
}