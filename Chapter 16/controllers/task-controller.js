// binding task model
var Task = require('../models/task.js');

// define list() to get all tasks and display
exports.list = function(req, res) {

	var tmp;
	// find tasks
	Task.find(function(err, tasks) {
		console.log('Succeed to get all tasks  {' + tasks + '}');
		tmp = JSON.stringify(tasks);
		res.send(tmp);
	});
	
};

exports.create = function(req, res) {
	// check same task is exist or not, if exist, just skip..
	Task.find(function(err, tasks) {
		//ÀúÀå
		new Task({
			contents : req.body.contents,
			date : req.body.date
		}).save();
		
		res.end();
		
	});

};
