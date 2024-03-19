var fibonaccie = require('../fibonaccie'), 
	assert = require('assert'),
	vows = require('vows');

vows.describe('Getting Fibonaccie Number').addBatch({
	'when trying to get fibonaccie 9th number':{
		topic: fibonaccie.getFibonaccieNumber(9),
		'they should be equal': function (topic){
			assert.equal(topic, 21, 'Wrong fibonaccie!! 9th fibonaccie number is 21!!');
		}
	},
	'when trying to get fibonaccie 10th number':{
		topic: fibonaccie.getFibonaccieNumber(10),
		'they should be equal': function (topic){
			assert.equal(topic, 34, 'Wrong fibonaccie!! 10th fibonaccie number is 34!!');
		}
	}	
}).run();