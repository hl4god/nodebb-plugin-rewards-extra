"use strict";

var rewards = {};
var user = require.main.require('./src/user');
var request = module.parent.require('request');
var nconf = module.parent.require("nconf");
var db = module.parent.require('./database');
var hole = nconf.get("hole");
var util = require("util");
var fs = require("fs");
var pfxFile = hole.pfxFile;
var pfxPwd = hole.pfxPwd;
var holeSite = hole.holeSite;
var awardUrl = hole.awardUrl;
rewards.get = function (rewards, callback) {
	rewards = rewards.concat([{
		"rid": "extra/award-reputation-jingyan-longzhu",
		"name": "奖励威望/经验/龙珠 ",
		"inputs": [{
			"type": "text",
			"name": "reputation",
			"label": "威望:"
		}, {
			"type": "text",
			"name": "jingyan",
			"label": "经验:"
		}, {
			"type": "text",
			"name": "longzhu",
			"label": "龙珠:"
		}]
	}]);
	callback(false, rewards);
};

rewards.awardReputationJingyanLongzhu = function (data) {
	// data  {reward:{reputation jingyan longzhu}}
	//威望自己加  添加经验 龙珠 给其他插件加
	user.incrementUserFieldBy(data.uid, 'reputation', data.reward.reputation);
  awardOthersToFreebacking(data);
};

//奖励经验 龙珠
function awardOthersToFreebacking(data, callback) {
	callback = callback || function () {};
	if (!holeSite || !awardUrl) {
		return;
	}
	var uid = data.uid;
	user.getUserField(uid, 'username', function (err, username) {
		if (err) {
			console.error(err);
			return;
		}
		request({
				method: 'POST',
				url: awardUrl,
				baseUrl: holeSite,
				json: true,
				body: {
					accountId: username,
					reputation:data.reward.reputation,
					credit: data.reward.jingyan,
					db: data.reward.longzhu
				},
        agentOptions: {
            pfx: fs.readFileSync(pfxFile),
            passphrase: pfxPwd,
            securityOptions: 'SSL_OP_NO_SSLv3'
        }
			},
			function (err, msg, res) {
				if (err) {
					//callback(err);
					console.error(err);
					awardLog(uid,data.reward,"fail",callback);
					return;
				}
				if (msg.statusCode !== 200) {
				//	callback(msg.statusMessage);
					awardLog(uid,data.reward,"fail",callback);
					return;
				}
				if (res.r && res.r.code === 504) { //发送成功
					awardLog(uid,data.reward,"ok",callback);
					return;
				}
				//callback(res.r);
				console.log(res.r);
				awardLog(uid,data.reward,"fail",callback);
			});
	});
}
//记录威望奖励积分请求的结果
function awardLog(uid, record,result, callback) {
    db.listPrepend("award:" + uid + ":log", util.format("%d:%d:%d:%s:%d", record.reputation, record.jingyan,record.longzhu,result, Date.now()), callback);
}
module.exports = rewards;
