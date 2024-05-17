/**
 * Notes: 兼职模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2024-03-23 04:00:00 
 */

const BaseProjectService = require('./base_project_service.js');
const dataUtil = require('../../../framework/utils/data_util.js');
const timeUtil = require('../../../framework/utils/time_util.js');
const util = require('../../../framework/utils/util.js');
const cloudUtil = require('../../../framework/cloud/cloud_util.js');
const FoodModel = require('../model/food_model.js');
const UserModel = require('../model/user_model.js');

class FoodService extends BaseProjectService {

	// 获取当前状态
	getStatusDesc(food) {
		 
	}

	/** 接单 */
	async acceptFood(userId, id) {

		this.AppError('[跑腿]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/** 取消我的订单 */
	async cancelFood(userId, id) {
		this.AppError('[跑腿]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/** 浏览 */
	async viewFood(id) {
		let fields = '*';

		let where = {
			_id: id,
			//FOOD_STATUS: 1
		}

		let food = await FoodModel.getOne(where, fields);
		if (!food) return null;

		// 接单人信息
		if (food.FOOD_STATUS > 0 && food.FOOD_ACCEPT_USER_ID) {
			food.acceptUser = await UserModel.getOne({ USER_MINI_OPENID: food.FOOD_ACCEPT_USER_ID }, 'USER_NAME,USER_MOBILE');
		}

		FoodModel.inc(id, 'FOOD_VIEW_CNT', 1);

		return food;
	}

	/** 获取 */
	async getFoodDetail(id) {
		return await FoodModel.getOne(id);
	}

	/**修改状态 */
	async statusFood(userId, id, status) {
		this.AppError('[跑腿]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/** 删除 */
	async delFood(userId, id) {
		this.AppError('[跑腿]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/** 插入 */
	async insertFood(userId, {
	 
	}) {
		this.AppError('[跑腿]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/** 修改 */
	async editFood(userId, {
		 
	}) {

		this.AppError('[跑腿]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/** 更新forms信息 */
	async updateFoodForms({
		id,
		hasImageForms
	}) {
		this.AppError('[跑腿]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/** 列表与搜索 */
	async getFoodList(userId, {
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序
		whereEx, //附加查询条件
		page,
		size,
		isTotal = true,
		oldTotal }) {
		orderBy = orderBy || {
			'FOOD_ORDER': 'asc',
			'FOOD_ADD_TIME': 'desc'
		};
		let fields = 'FOOD_ACCEPT_USER_ID,FOOD_END_TIME,FOOD_STATUS,FOOD_ADD_TIME,FOOD_USER_ID,FOOD_OBJ';

		let where = {};
		where.and = {
			//FOOD_STATUS: 1,
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};


		if (util.isDefined(search) && search) {
			if (search == '我的发布') {
				where.and.FOOD_USER_ID = userId;
			}
			else if (search == '我的接单') {
				where.and.FOOD_ACCEPT_USER_ID = userId;
			}
			else if (search == '我的收藏') {
				where.and.FOOD_FAV_LIST = userId;
			}

			else {
				where.or = [
					{ 'FOOD_OBJ.title': ['like', search] },
					{ 'FOOD_OBJ.poster': ['like', search] },
					{ 'FOOD_OBJ.tel': ['like', search] },
				];
			}

		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'cateId': {
					where.and.FOOD_CATE_ID = String(sortVal);
					break;
				}
				case 'status': {
					where.and.FOOD_STATUS = Number(sortVal);
					break;
				}
				case 'timeout': { //过期
					where.and.FOOD_STATUS = 0;
					where.and.FOOD_END_TIME = ['<', this._timestamp]
					break;
				}
				case 'wait': { //待接单
					where.and.FOOD_STATUS = 0;
					where.and.FOOD_END_TIME = ['>=', this._timestamp]
					break;
				}
				case 'sort': {
					orderBy = this.fmtOrderBySort(sortVal, 'FOOD_ADD_TIME');
					break;
				}
			}
		}

		return await FoodModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);

	}

}

module.exports = FoodService;