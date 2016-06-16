"use strict";

var conditionals = {};

conditionals.get = function(conditionals, callback) {
	conditionals = conditionals.concat([
		{
			"name": "/",
			"conditional": "divisibleby"
		}
	]);
	callback(false, conditionals);
};


conditionals.divisibleby = function(data, callback) {
	callback(false, parseInt(data.left) % parseInt(data.right) === 0);
};


module.exports = conditionals;
