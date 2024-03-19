var connect = require('connect'), http = require('http');
var app = connect();

app.use(connect.logger());

// Main page
app.use(function(req, res, next) {
	if (req.url == "/") {
		res.writeHead(200, { "Content-Type" : "text/plain"
		});
		res.end("Welcome to the homepage!\n");
		// The middleware stops here.
	} else {
		next();
	}
});

// About page
app.use(function(req, res, next) {
	if (req.url == "/about") {
		res.writeHead(200, {
			"Content-Type" : "text/plain"
		});
		res.end("Welcome to the about page!\n");
		// The middleware stops here.
	} else {
		next();
	}
});

// 404 Error page
app.use(function(req, res) {
	res.writeHead(404, {
		"Content-Type" : "text/plain"
	});
	res.end("404 error!\n");
});

app.use(function(req, res) {
	res.writeHead(200, {
		'Content-Type' : 'text/plain'
	});
	res.end('Hello World\n');
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
