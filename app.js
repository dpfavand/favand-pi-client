// Configuration settings. Could be changed based on environment.
var config  = require('./config');

// http and socket.io server and client
var app     = require('express')();
var server  = require('socket.io-client')(config.socketServer);
var http    = require('http').Server(app);
var io      = require('socket.io')(http);
var camera  = require('./camera'); // for the automatic camera update system


// automatic update routines
var updateControl       = require('./updatecontrol.js').init(server);

// using socket as the client to the main server
// using io as the local server

http.listen(config.clientport, function(){
    console.log('Listening for connections');
})

server.on('connect', function(){
    console.log('connected to server');
    // camera.snapLoop(server);
})

var PythonShell = require('python-shell');

PythonShell.run('camera.py', function(err, results){
            if (err) throw err;
            
            // connection.emit('image', {image: true, buffer: 'data:image/png;base64,' + results[0] });
            console.log("snap")
            
            
        });

