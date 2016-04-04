// Configuration settings. Could be changed based on environment.
var config  = require('./config');

// http and socket.io server and client
var app     = require('express')();
var server  = require('socket.io-client')(config.socketServer);
var http    = require('http').Server(app);
var io      = require('socket.io')(http);
var camera  = require('./camera'); // for the automatic camera update system
var weather = require('./weather'); // for sampling the temp and humidity and sending the data to the server

// automatic update routines
var updateControl       = require('./updatecontrol.js').init(server);

// using socket as the client to the main server
// using io as the local server

http.listen(config.clientport, function(){
    console.log('Listening for connections');
})

server.on('connect', function(){
    console.log('connected to server');
    camera.snapLoop(server);
    weather.sampleLoop(server);
    
    server.emit('pi_error', "CONNECTED");
})

