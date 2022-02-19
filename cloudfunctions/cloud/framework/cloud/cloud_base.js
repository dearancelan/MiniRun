/**
 * Notes: 云初始化实例
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux@qq.com
 * Date: 2020-09-05 04:00:00 
 */

const config = require('../../config/config.js');

/**
 * 获得云实例
 */
function getCloud() {
	const cloud = require('wx-server-sdk');
	cloud.init({
		env: cloud.DYNAMIC_CURRENT_ENV
	});
	return cloud;
}

module.exports = {
	getCloud
}