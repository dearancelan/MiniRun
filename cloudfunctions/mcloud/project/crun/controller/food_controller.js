/**
 * Notes: 兼职模块控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2024-03-23 04:00:00 
 */

const BaseProjectController = require('./base_project_controller.js');
const FoodService = require('../service/food_service.js');
const timeUtil = require('../../../framework/utils/time_util.js');
const contentCheck = require('../../../framework/validate/content_check.js');

class FoodController extends BaseProjectController { 

	/** 接单 */
	async acceptFood() {
		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new FoodService();
		return await service.acceptFood(this._userId, input.id);
	}

	/** 取消接单 */
	async cancelFood() {
		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new FoodService();
		return await service.cancelFood(this._userId, input.id);
	}

	/** 获取信息用于编辑修改 */
	async getFoodDetail() {

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new FoodService();
		let food = await service.getFoodDetail(input.id);
		if (food) {
			food.FOOD_END_TIME = timeUtil.timestamp2Time(food.FOOD_END_TIME, 'Y-M-D h:m');
		}

		return food;

	}

	/** 浏览详细 */
	async viewFood() {
		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new FoodService();
		let food = await service.viewFood(input.id);

		if (food) { 
			food.end = timeUtil.timestamp2Time(food.FOOD_END_TIME, 'Y/M/D h:m:s');
			food.end2 = timeUtil.timestamp2Time(food.FOOD_END_TIME, 'Y-M-D h:m');

			food.FOOD_ADD_TIME = timeUtil.timestamp2Time(food.FOOD_ADD_TIME, 'Y-M-D h:m');
			food.FOOD_ACCEPT_TIME = timeUtil.timestamp2Time(food.FOOD_ACCEPT_TIME, 'Y-M-D h:m');
			food.FOOD_OVER_TIME = timeUtil.timestamp2Time(food.FOOD_OVER_TIME, 'Y-M-D h:m');

			food.status = service.getStatusDesc(food);

			food.myaccept = (food.FOOD_ACCEPT_USER_ID === this._userId);
			food.mypost = (food.FOOD_USER_ID === this._userId);

		}

		return food;
	}

	/** 状态修改 */
	async statusFood() {
		// 数据校验
		let rules = {
			id: 'must|id',
			status: 'must|int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new FoodService();
		return await service.statusFood(this._userId, input.id, input.status);

	}

	/** 列表与搜索 */
	async getFoodList() {

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

		let service = new FoodService();
		let result = await service.getFoodList(this._userId, input);

		// 数据格式化
		let list = result.list;

		for (let k = 0; k < list.length; k++) {
			list[k].status = service.getStatusDesc(list[k]);

			list[k].FOOD_ADD_TIME = timeUtil.timestamp2Time(list[k].FOOD_ADD_TIME, 'Y-M-D h:m');
			list[k].end = timeUtil.timestamp2Time(list[k].FOOD_END_TIME, 'M月D日 h:m');

			// 删除冗余
			if (list[k].FOOD_OBJ.content) delete list[k].FOOD_OBJ.content;

			list[k].myaccept = (list[k].FOOD_ACCEPT_USER_ID === this._userId);
			list[k].mypost = (list[k].FOOD_USER_ID === this._userId);

		}

		return result;

	}

	/** 发布 */
	async insertFood() {

		// 数据校验 
		let rules = {
		 
		};


		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiClient(input);

		let service = new FoodService();
		let result = await service.insertFood(this._userId, input);

		return result;

	}

	/** 修改 */
	async editFood() {

		// 数据校验 
		let rules = {
			 
		};


		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiClient(input);

		let service = new FoodService();
		return await service.editFood(this._userId, input); 

	}

	/** 更新图片信息 */
	async updateFoodForms() {

		// 数据校验
		let rules = {
		 
		};

		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiClient(input);

		let service = new FoodService();
		return await service.updateFoodForms(input);
	}

	/** 删除 */
	async delFood() {

		// 数据校验
		let rules = {
			id: 'must|id',
			isAdmin: 'must|bool'
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new FoodService();
		await service.delFood(this._userId, input.id);

	}

}

module.exports = FoodController;