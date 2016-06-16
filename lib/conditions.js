"use strict";
//暂不适用
var conditions = {};

conditions.get = function(conditions, callback) {
	conditions = conditions.concat([
		{
			"name": "Post Count",
			"condition": "essentials/user.postcount"
		}
	]);

	callback(false, conditions);
};


/*
[
  'profileviews',
  'lastonline',
  'password',
  'lastposttime',
  'topiccount',
  'status',
  'banned',
  'reputation',
  'picture',
  'postcount',
  'joindate',
  'gravatarpicture',
  'uploadedpicture' ]

  filter:user.updateProfile', {uid: uid, settings: data} ['username', 'email', 'fullname', 'website', 'location', 'birthday', 'signature']
  */
module.exports = conditions;
