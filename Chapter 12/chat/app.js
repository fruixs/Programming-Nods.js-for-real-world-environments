//모듈을 변수에 저장
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var fs = require('fs');
var path = require('path');

//포트 설정 
app.set('port', 3000);
//favicon 설정 
app.use(express.favicon());
//POST body 읽기 
app.use(express.bodyParser());
//static 파일 경로 설정
app.use(express.static(path.join(__dirname, 'public')));

//App 실행
app.start = app.listen = app.aaa = function(){
	return server.listen.apply(server, arguments)
}
app.aaa(app.get('port'),function(){
	console.log("Server Start");
});

// 서비스 파일 include 함수 
function include(file_) {
	with (global) {
		eval(fs.readFileSync(file_) + '');
	};
};

// config 파일 추가
include(__dirname + "/config/include.js")

// 서비스 파일 추가
for(var i = 0 ; i < servicefile.length ; i++){
	include(__dirname + "/service/" + servicefile[i] );
}

// 모든 http 요청 처리 
app.all('*', function(req, res, next){
	next();
});
 