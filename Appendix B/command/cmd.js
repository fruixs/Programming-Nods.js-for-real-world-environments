

var exec = require('child_process').exec;

exec("node.exe", function(error, stdout, stderr){
	console.log(stdout);
});

