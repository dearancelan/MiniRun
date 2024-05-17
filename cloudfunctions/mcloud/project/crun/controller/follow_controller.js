/**
 * Notes: 兼职模块控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2024-03-23 04:00:00 
 */

const BaseProjectController = require('./base_project_controller.js');
const FollowService = require('../service/follow_service.js');
const timeUtil = require('../../../framework/utils/time_util.js');
const contentCheck = require('../../../framework/validate/content_check.js');

class FollowController extends BaseProjectController { 

	/** 接单 */
	async acceptFollow() {
		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new FollowService();
		return await service.acceptFollow(this._userId, input.id);
	}

	/** 取消接单 */
	async cancelFollow() {
		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new FollowService();
		return await service.cancelFollow(this._userId, input.id);
	}

	/** 获取信息用于编辑修改 */
	async getFollowDetail() {

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new FollowService();
		let follow = await service.getFollowDetail(input.id);
		if (follow) {
			follow.FOLLOW_END_TIME = timeUtil.timestamp2Time(follow.FOLLOW_END_TIME, 'Y-M-D h:m');
		}

		return follow;

	}

	/** 浏览详细 */
	async viewFollow() {
		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new FollowService();
		let follow = await service.viewFollow(input.id);

		if (follow) { 
			follow.end = timeUtil.timestamp2Time(follow.FOLLOW_END_TIME, 'Y/M/D h:m:s');
			follow.end2 = timeUtil.timestamp2Time(follow.FOLLOW_END_TIME, 'Y-M-D h:m');

			follow.FOLLOW_ADD_TIME = timeUtil.timestamp2Time(follow.FOLLOW_ADD_TIME, 'Y-M-D h:m');
			follow.FOLLOW_ACCEPT_TIME = timeUtil.timestamp2Time(follow.FOLLOW_ACCEPT_TIME, 'Y-M-D h:m');
			follow.FOLLOW_OVER_TIME = timeUtil.timestamp2Time(follow.FOLLOW_OVER_TIME, 'Y-M-D h:m');

			follow.status = service.getStatusDesc(follow);

			follow.myaccept = (follow.FOLLOW_ACCEPT_USER_ID === this._userId);
			follow.mypost = (follow.FOLLOW_USER_ID === this._userId);

		}

		return follow;
	}

	/** 状态修改 */
	async statusFollow() {
		// 数据校验
		let rules = {
			id: 'must|id',
			status: 'must|int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new FollowService();
		return await service.statusFollow(this._userId, input.id, input.status);

	}

	/** 列表与搜索 */
	async getFollowList() {

		// 数据校验
		let rules = {
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			page: 'must|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new FollowService();
		let result = await service.getFollowList(this._userId, input);

		// 数据格式化
		let list = result.list;

		for (let k = 0; k < list.length; k++) {
			list[k].status = service.getStatusDesc(list[k]);

			list[k].FOLLOW_ADD_TIME = timeUtil.timestamp2Time(list[k].FOLLOW_ADD_TIME, 'Y-M-D h:m');
			list[k].end = timeUtil.timestamp2Time(list[k].FOLLOW_END_TIME, 'M月D日 h:m');

			// 删除冗余
			if (list[k].FOLLOW_OBJ.content) delete list[k].FOLLOW_OBJ.content;

			list[k].myaccept = (list[k].FOLLOW_ACCEPT_USER_ID === this._userId);
			list[k].mypost = (list[k].FOLLOW_USER_ID === this._userId);

		}

		return result;

	}

	/** 发布 */
	async insertFollow() {

		// 数据校验 
		let rules = {
			 
		};


		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiClient(input);

		let service = new FollowService();
		let result = await service.insertFollow(this._userId, input);

		return result;

	}

	/** 修改 */
	async editFollow() {

		// 数据校验 
		let rules = {
			 
		};


		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiClient(input);

		let service = new FollowService();
		return await service.editFollow(this._userId, input); 

	}

	/** 更新图片信息 */
	async updateFollowForms() {

		// 数据校验
		let rules = {
		 
		};

		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiClient(input);

		let service = new FollowService();
		return await service.updateFollowForms(input);
	}

	/** 删除 */
	async delFollow() {

		// 数据校验
		let rules = {
			id: 'must|id',
			isAdmin: 'must|bool'
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new FollowService();
		await service.delFollow(this._userId, input.id);

	}

}

module.exports = FollowController;