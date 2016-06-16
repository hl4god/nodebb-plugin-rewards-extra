"use strict";

var rewards = {};
var user = require.main.require('./src/user');

rewards.get = function(rewards, callback) {
    getGroupList(function(err, groups) {
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
    });
};

rewards.awardReputationJingyanLongzhu = function(data) {
    // data  {reputation jingyan longzhu}
    //威望自己加  添加经验 龙珠 给其他插件加
    user.incrementUserFieldBy(data.uid, 'reputation', data.reward.reputation);
};

module.exports = rewards;
