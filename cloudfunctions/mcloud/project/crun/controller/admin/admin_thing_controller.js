/**
 * Notes: 资讯模块后台管理-控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2021-07-11 10:20:00 
 */

const BaseProjectAdminController = require('./base_project_admin_controller.js');

const AdminThingService = require('../../service/admin/admin_thing_service.js');
const ThingService = require('../../service/thing_service.js');
const timeUtil = require('../../../../framework/utils/time_util.js');

class AdminThingController extends BaseProjectAdminController {

	async getAdminThingDetail() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new ThingService();
		return await service.getThingDetail(input.id);

	}

	async sortThing() {
		await this.isAdmin();

		let rules = {
			id: 'must|id',
			sort: 'must|int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminThingService();
		await service.sortThing(input.id, input.sort);
	}

	async statusThing() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
			status: 'must|int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new ThingService();
		return await service.statusThing(null, input.id, input.status); 
	}

	async delThing() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new ThingService();
		await service.delThing(null, input.id);

	}

	async getAdminThingList() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			whereEx: 'object|name=附加查询条件',
			page: 'must|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminThingService();
		let thingService = new ThingService();
		let result = await service.getAdminThingList(input);

		// 数据格式化
		let list = result.list;
		for (let k = 0; k < list.length; k++) {
			list[k].status = thingService.getStatusDesc(list[k]);

			list[k].THING_ADD_TIME = timeUtil.timestamp2Time(list[k].THING_ADD_TIME, 'Y-M-D h:m:s');
			list[k].THING_ACCEPT_TIME = timeUtil.timestamp2Time(list[k].THING_ACCEPT_TIME, 'Y-M-D h:m:s');
			list[k].THING_OVER_TIME = timeUtil.timestamp2Time(list[k].THING_OVER_TIME, 'Y-M-D h:m:s');

			list[k].end = timeUtil.timestamp2Time(list[k].THING_END_TIME, 'Y-M-D h:m:s');

			if (list[k].THING_OBJ && list[k].THING_OBJ.content)
				delete list[k].THING_OBJ.content;
		}
		result.list = list;

		return result;

	}

	/************** 用户数据导出 BEGIN ********************* */
	/** 当前是否有导出文件生成 */
	async thingDataGet() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			isDel: 'int|must', //是否删除已有记录
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminThingService();

		if (input.isDel === 1)
			await service.deleteThingDataExcel(); //先删除 

		return await service.getThingDataURL();
	}

	/** 导出数据 */
	async thingDataExport() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			start: 'string|must',
			end: 'string|must',
			status: 'int|must',
			fields: 'array',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminThingService();
		return await service.exportThingDataExcel(input);
	}

	/** 删除导出的用户数据 */
	async thingDataDel() {
		await this.isAdmin();

		// 数据校验
		let rules = {};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminThingService();
		return await service.deleteThingDataExcel();
	}
}

module.exports = AdminThingController;