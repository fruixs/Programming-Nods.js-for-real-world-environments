var io = require('socket.io').listen(80);

io.sockets.on('connection', function(socket) {
	socket.on('msg', function(data) {
		console.log(data);
		setTimeout(function() {
			io.sockets.emit('msg_by_server', 'Sever got your message : ' + data);
		}, 1000);
	});
});