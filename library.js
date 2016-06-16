"use strict";

var plugin = {},
	rewards = module.parent.require('./rewards'),
	user = module.parent.require('./user');


//plugin.conditions = require('./lib/conditions');
plugin.conditionals = require('./lib/conditionals');
plugin.rewards = require('./lib/rewards');


module.exports = plugin;
