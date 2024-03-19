var fibonaccie = require('../fibonaccie');

exports.testGetFibonaccieNumber = function(test) {
	test.expect(3);
	test.equal(fibonaccie.getFibonaccieNumber(8), 13,
			'Wrong fibonaccie!! 8th fibonaccie number is 13!!');
	test.equal(fibonaccie.getFibonaccieNumber(9), 21,
			'Wrong fibonaccie!! 9th fibonaccie number is 21!!');
	test.equal(fibonaccie.getFibonaccieNumber(10), 34,
			'Wrong fibonaccie!! 10th fibonaccie number is 34!!');
	test.done();
};