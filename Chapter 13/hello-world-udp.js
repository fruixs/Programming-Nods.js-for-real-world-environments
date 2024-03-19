var http = require('http'), 
		client = require('dgram').createSocket('udp4'),
		message = 'This is my first message, next time you will see message from server!!';

client.on("message", function(msg, rinfo) {
	message = msg;
});

client.on("error", function(err) {
	console.log("server error:\n" + err.stack);
	server.close();
});

http.createServer(function(req, res) {

	// control for favicon
	if (req.url === '/favicon.ico') {
		res.writeHead(200, {
			'Content-Type' : 'image/x-icon'
		});
		res.end();
		return;
	}

	var data = new Buffer('Client Buffer!!');
	client.send(data, 0, data.length, 4445, 'localhost');

	res.writeHead(200, {
		'Content-Type' : 'text/plain'
	});
	res.end('Hello World\n' + message);

}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
