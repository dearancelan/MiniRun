/**
 * Notes: 后台HOME/登录模块 
 * Date: 2021-06-15 07:48:00 
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 */

const BaseProjectAdminService = require('./base_project_admin_service.js');
const UserModel = require('../../model/user_model.js');
const NewsModel = require('../../model/news_model.js');
const MailModel = require('../../model/mail_model.js'); 
const ThingModel = require('../../model/thing_model.js'); 
const FoodModel = require('../../model/food_model.js'); 
const FollowModel = require('../../model/follow_model.js'); 
const constants = require('../../public/constants.js');
const setupUtil = require('../../../../framework/utils/setup/setup_util.js');

class AdminHomeService extends BaseProjectAdminService {

	/**
	 * 首页数据归集
	 */
	async adminHome() {
		let where = {};

		let userCnt = await UserModel.count(where);
		let newsCnt = await NewsModel.count(where);
 
		let mailCnt = await MailModel.count(where); 
		let thingCnt = await ThingModel.count(where); 
		let foodCnt = await FoodModel.count(where); 
		let followCnt = await FollowModel.count(where); 

		return [
			{ title: '用户数', cnt: userCnt },
			{ title: '公告数', cnt: newsCnt },
 
			{ title: '代取数', cnt: mailCnt }, 
			{ title: '急事数', cnt: thingCnt }, 
			{ title: '代买数', cnt: foodCnt }, 
			{ title: '陪替数', cnt: followCnt }, 
		]
	}

	// 用户数据清理  
	async clearUserData(userId) {

	} 


	//##################首页推荐
	// 首页推荐清理
	async clearVouchData() {
		await setupUtil.remove(constants.SETUP_HOME_VOUCH_KEY);

	}


	/**添加首页推荐 */
	async updateHomeVouch(node) {
		if (node.ext) node.ext = '#' + node.ext;
		let key = constants.SETUP_HOME_VOUCH_KEY;
		let list = await setupUtil.get(key);
		if (!list || !Array.isArray(list)) list = [];

		// 重复性判断
		for (let k = 0; k < list.length; k++) {
			if (list[k].id == node.id) {
				// 已存在
				list[k] = node;
				return await setupUtil.set(key, list, 'vouch');
			}
		}

		// 赋值 
		let data = node;
		list.unshift(data);
		await setupUtil.set(key, list, 'vouch');

	}

	/**删除推荐数据 */
	async delHomeVouch(id) {
		let key = constants.SETUP_HOME_VOUCH_KEY;
		let list = await setupUtil.get(key);
		if (!list || !Array.isArray(list)) return;

		let newList = [];
		for (let k = 0; k < list.length; k++) {
			if (list[k].id != id) {
				newList.push(list[k]);
			}
		}

		return await setupUtil.set(key, newList, 'vouch');

	}
}

module.exports = AdminHomeService;