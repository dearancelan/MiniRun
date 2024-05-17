/**
 * Notes: 资讯模块后台管理-控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2021-07-11 10:20:00 
 */

const BaseProjectAdminController = require('./base_project_admin_controller.js');

const AdminFollowService = require('../../service/admin/admin_follow_service.js');
const FollowService = require('../../service/follow_service.js');
const timeUtil = require('../../../../framework/utils/time_util.js');

class AdminFollowController extends BaseProjectAdminController {

	async getAdminFollowDetail() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new FollowService();
		return await service.getFollowDetail(input.id);

	}

	async sortFollow() {
		await this.isAdmin();

		let rules = {
			id: 'must|id',
			sort: 'must|int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminFollowService();
		await service.sortFollow(input.id, input.sort);
	}

	async statusFollow() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
			status: 'must|int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new FollowService();
		return await service.statusFollow(null, input.id, input.status); 
	}

	async delFollow() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new FollowService();
		await service.delFollow(null, input.id);

	}

	async getAdminFollowList() {
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

		let service = new AdminFollowService();
		let followService = new FollowService();
		let result = await service.getAdminFollowList(input);

		// 数据格式化
		let list = result.list;
		for (let k = 0; k < list.length; k++) {
			list[k].status = followService.getStatusDesc(list[k]);

			list[k].FOLLOW_ADD_TIME = timeUtil.timestamp2Time(list[k].FOLLOW_ADD_TIME, 'Y-M-D h:m:s');
			list[k].FOLLOW_ACCEPT_TIME = timeUtil.timestamp2Time(list[k].FOLLOW_ACCEPT_TIME, 'Y-M-D h:m:s');
			list[k].FOLLOW_OVER_TIME = timeUtil.timestamp2Time(list[k].FOLLOW_OVER_TIME, 'Y-M-D h:m:s');

			list[k].end = timeUtil.timestamp2Time(list[k].FOLLOW_END_TIME, 'Y-M-D h:m:s');

			if (list[k].FOLLOW_OBJ && list[k].FOLLOW_OBJ.content)
				delete list[k].FOLLOW_OBJ.content;
		}
		result.list = list;

		return result;

	}

	/************** 用户数据导出 BEGIN ********************* */
	/** 当前是否有导出文件生成 */
	async followDataGet() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			isDel: 'int|must', //是否删除已有记录
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminFollowService();

		if (input.isDel === 1)
			await service.deleteFollowDataExcel(); //先删除 

		return await service.getFollowDataURL();
	}

	/** 导出数据 */
	async followDataExport() {
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

		let service = new AdminFollowService();
		return await service.exportFollowDataExcel(input);
	}

	/** 删除导出的用户数据 */
	async followDataDel() {
		await this.isAdmin();

		// 数据校验
		let rules = {};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminFollowService();
		return await service.deleteFollowDataExcel();
	}
}

module.exports = AdminFollowController;