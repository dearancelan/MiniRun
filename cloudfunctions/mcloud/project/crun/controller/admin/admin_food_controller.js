/**
 * Notes: 资讯模块后台管理-控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2021-07-11 10:20:00 
 */

const BaseProjectAdminController = require('./base_project_admin_controller.js');

const AdminFoodService = require('../../service/admin/admin_food_service.js');
const FoodService = require('../../service/food_service.js');
const timeUtil = require('../../../../framework/utils/time_util.js');

class AdminFoodController extends BaseProjectAdminController {

	async getAdminFoodDetail() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new FoodService();
		return await service.getFoodDetail(input.id);

	}

	async sortFood() {
		await this.isAdmin();

		let rules = {
			id: 'must|id',
			sort: 'must|int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminFoodService();
		await service.sortFood(input.id, input.sort);
	}

	async statusFood() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
			status: 'must|int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new FoodService();
		return await service.statusFood(null, input.id, input.status); 
	}

	async delFood() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new FoodService();
		await service.delFood(null, input.id);

	}

	async getAdminFoodList() {
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

		let service = new AdminFoodService();
		let foodService = new FoodService();
		let result = await service.getAdminFoodList(input);

		// 数据格式化
		let list = result.list;
		for (let k = 0; k < list.length; k++) {
			list[k].status = foodService.getStatusDesc(list[k]);

			list[k].FOOD_ADD_TIME = timeUtil.timestamp2Time(list[k].FOOD_ADD_TIME, 'Y-M-D h:m:s');
			list[k].FOOD_ACCEPT_TIME = timeUtil.timestamp2Time(list[k].FOOD_ACCEPT_TIME, 'Y-M-D h:m:s');
			list[k].FOOD_OVER_TIME = timeUtil.timestamp2Time(list[k].FOOD_OVER_TIME, 'Y-M-D h:m:s');

			list[k].end = timeUtil.timestamp2Time(list[k].FOOD_END_TIME, 'Y-M-D h:m:s');

			if (list[k].FOOD_OBJ && list[k].FOOD_OBJ.content)
				delete list[k].FOOD_OBJ.content;
		}
		result.list = list;

		return result;

	}

	/************** 用户数据导出 BEGIN ********************* */
	/** 当前是否有导出文件生成 */
	async foodDataGet() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			isDel: 'int|must', //是否删除已有记录
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminFoodService();

		if (input.isDel === 1)
			await service.deleteFoodDataExcel(); //先删除 

		return await service.getFoodDataURL();
	}

	/** 导出数据 */
	async foodDataExport() {
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

		let service = new AdminFoodService();
		return await service.exportFoodDataExcel(input);
	}

	/** 删除导出的用户数据 */
	async foodDataDel() {
		await this.isAdmin();

		// 数据校验
		let rules = {};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminFoodService();
		return await service.deleteFoodDataExcel();
	}
}

module.exports = AdminFoodController;