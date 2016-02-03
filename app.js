var config  = require('./config');
var app     = require('express')();
var server  = require('socket.io-client')(config.socketServer);
var http    = require('http').Server(app);
var io      = require('socket.io')(http);
var fs      = require('fs');

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

function sendImage(connection){
    fs.readFile(config.camerajpeg, function(err, buf){
        if (err) {
            server.emit('pi_error', err)
            console.error(err);
        } else {
            connection.emit('image', {image: true, buffer: 'data:image/jpeg;base64,' + buf.toString('base64')});   
        }    
    }); 
    
}

function serverUpdateLoop() {
    if(server.connected){
        sendImage(server);
        console.log(Date.now(), "Sent image to server");
        setTimeout(serverUpdateLoop, 5 * 60 * 1000);    
    }
    
}