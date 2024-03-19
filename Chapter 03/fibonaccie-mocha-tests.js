var fibonaccie = require('../fibonaccie'), 
		assert = require('assert');

describe('Getting Fibonaccie Number >>', function() {
	describe('when trying to get fibonaccie 8th number', function() {
		it('should return 13',
				function() {
					assert.equal(fibonaccie.getFibonaccieNumber(8), 13,
							'Wrong Fibonaccie!!');
				})
	})
	describe('when trying to get fibonaccie 9th number', function() {
		it('should return 13',
				function() {
					assert.equal(fibonaccie.getFibonaccieNumber(9), 21,
							'Wrong Fibonaccie!!');
				})
	})
	describe('when trying to get fibonaccie 8th number', function() {
		it('should return 13', function() {
			assert
					.equal(fibonaccie.getFibonaccieNumber(10), 34, 'Wrong Fibonaccie!!');
		})
	})
})