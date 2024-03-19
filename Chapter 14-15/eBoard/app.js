
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);


io.sockets.on('connection', function (socket) {

  socket.on('linesend', function (data) {
  	console.log(data);
    socket.broadcast.emit('linesend_toclient',data);
  });
  
   //map 이벤트를 받아서 map_toclient 이벤트로 클리이언트에 전달
   socket.on('map', function (data) {
    console.log(data);
    socket.broadcast.emit('map_toclient',data);
   });
   
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});
