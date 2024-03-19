var express = require('express'), http = require('http');
var app = express();

app.all("*", function(request, response, next) {
	response.writeHead(200, {
		"Content-Type" : "text/plain"
	});
	next();
});

app.get("/", function(request, response) {
	response.end("Welcome to the homepage!");
});

app.get("/about", function(request, response) {
	response.end("Welcome to the about page!");
});

app.get("/hi/:user", function(req, res) {
	  res.end("Hi, " + req.params.user + ".");
	});

app.get("*", function(request, response) {
	response.end("404!");
});

http.createServer(app).listen(1337);

console.log('Server running at http://127.0.0.1:1337/');
