/**
 * Notes: 兼职模块控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2024-03-23 04:00:00 
 */

const BaseProjectController = require('./base_project_controller.js');
const ThingService = require('../service/thing_service.js');
const timeUtil = require('../../../framework/utils/time_util.js');
const contentCheck = require('../../../framework/validate/content_check.js');

class ThingController extends BaseProjectController { 

	/** 接单 */
	async acceptThing() {
		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new ThingService();
		return await service.acceptThing(this._userId, input.id);
	}

	/** 取消接单 */
	async cancelThing() {
		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new ThingService();
		return await service.cancelThing(this._userId, input.id);
	}

	/** 获取信息用于编辑修改 */
	async getThingDetail() {

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new ThingService();
		let thing = await service.getThingDetail(input.id);
		if (thing) {
			thing.THING_END_TIME = timeUtil.timestamp2Time(thing.THING_END_TIME, 'Y-M-D h:m');
		}

		return thing;

	}

	/** 浏览详细 */
	async viewThing() {
		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new ThingService();
		let thing = await service.viewThing(input.id);

		if (thing) { 
			thing.end = timeUtil.timestamp2Time(thing.THING_END_TIME, 'Y/M/D h:m:s');
			thing.end2 = timeUtil.timestamp2Time(thing.THING_END_TIME, 'Y-M-D h:m');

			thing.THING_ADD_TIME = timeUtil.timestamp2Time(thing.THING_ADD_TIME, 'Y-M-D h:m');
			thing.THING_ACCEPT_TIME = timeUtil.timestamp2Time(thing.THING_ACCEPT_TIME, 'Y-M-D h:m');
			thing.THING_OVER_TIME = timeUtil.timestamp2Time(thing.THING_OVER_TIME, 'Y-M-D h:m');

			thing.status = service.getStatusDesc(thing);

			thing.myaccept = (thing.THING_ACCEPT_USER_ID === this._userId);
			thing.mypost = (thing.THING_USER_ID === this._userId);

		}

		return thing;
	}

	/** 状态修改 */
	async statusThing() {
		// 数据校验
		let rules = {
			id: 'must|id',
			status: 'must|int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new ThingService();
		return await service.statusThing(this._userId, input.id, input.status);

	}

	/** 列表与搜索 */
	async getThingList() {

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

		let service = new ThingService();
		let result = await service.getThingList(this._userId, input);
 
		// 数据格式化
		let list = result.list;

		for (let k = 0; k < list.length; k++) {
			list[k].status = service.getStatusDesc(list[k]);

			list[k].THING_ADD_TIME = timeUtil.timestamp2Time(list[k].THING_ADD_TIME, 'Y-M-D h:m');
			list[k].end = timeUtil.timestamp2Time(list[k].THING_END_TIME, 'M月D日 h:m');
 
			// 删除冗余
			if (list[k].THING_OBJ.content) delete list[k].THING_OBJ.content;

			list[k].myaccept = (list[k].THING_ACCEPT_USER_ID === this._userId);
			list[k].mypost = (list[k].THING_USER_ID === this._userId);

		}

		return result;

	}

	/** 发布 */
	async insertThing() {

		// 数据校验 
		let rules = {
			 
		};


		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiClient(input);

		let service = new ThingService();
		let result = await service.insertThing(this._userId, input);

		return result;

	}

	/** 修改 */
	async editThing() {

		// 数据校验 
		let rules = {
		 
		};


		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiClient(input);

		let service = new ThingService();
		return await service.editThing(this._userId, input); 

	}

	/** 更新图片信息 */
	async updateThingForms() {

		// 数据校验
		let rules = {
		 
		};

		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiClient(input);

		let service = new ThingService();
		return await service.updateThingForms(input);
	}

	/** 删除 */
	async delThing() {

		// 数据校验
		let rules = {
			id: 'must|id',
			isAdmin: 'must|bool'
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new ThingService();
		await service.delThing(this._userId, input.id);

	}

}

module.exports = ThingController;