'use strict';

// express & socket output
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

const path = require('path');

app.use(express.static(path.resolve('./dist')));

const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`Listening on port: ${port}`));

io.sockets.on('connection', function (socket) {
	console.log('Websocket connection!');
	//console.log(socket.handshake);
	/*
	socket.on('send:msg', function (msg) {
		//console.log(msg);
	});
*/
});


