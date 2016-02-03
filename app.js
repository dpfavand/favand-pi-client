var config = require('./config.json');
var express = require('express');
var socket = require('socket.io-client')(config.socketServer);