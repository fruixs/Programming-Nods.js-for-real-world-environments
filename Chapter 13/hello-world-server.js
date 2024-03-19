var http = require('http'), 
		client = require('net').Socket(),
		fromServer = '';

client.connect(15001, function() {
	console.log('Connected succesfully!!');
});

// When I get 'data' from server,  put 'data' in 'message' to send in response
client.on('data', function(data) {
	console.log('Recieve data: ' + data);
	fromServer = data;
});

// Add a 'close' event handler for the client socket
client.on('close', function() {
	console.log('Connection closed');
	// Close the client socket completely
	client.destroy();	
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
	
	// Write a message to the socket
	client.write('Who\'s there?\n', function(){
		console.log('Write data successfully!!');
	});	
	
	res.writeHead(200, {
		'Content-Type' : 'text/plain'
	});
	res.end('Hello World\n' + fromServer);
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
