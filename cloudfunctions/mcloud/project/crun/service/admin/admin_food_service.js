/**
 * Notes: 资讯后台管理
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2021-07-11 07:48:00 
 */

const BaseProjectAdminService = require('./base_project_admin_service.js');
const util = require('../../../../framework/utils/util.js');
const exportUtil = require('../../../../framework/utils/export_util.js');
const timeUtil = require('../../../../framework/utils/time_util.js');
const dataUtil = require('../../../../framework/utils/data_util.js');
const FoodModel = require('../../model/food_model.js');
const UserModel = require('../../model/user_model.js');
const FoodService = require('../food_service.js');

// 导出数据KEY
const EXPORT_FOOD_DATA_KEY = 'EXPORT_FOOD_DATA';

class AdminFoodService extends BaseProjectAdminService {

	async sortFood(id, sort) {
		sort = Number(sort);
		let data = {};
		data.FOOD_ORDER = sort;
		await FoodModel.edit(id, data);
	}

	async getAdminFoodList({
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序
		whereEx, //附加查询条件
		page,
		size,
		isTotal = true,
		oldTotal
	}) {

		orderBy = orderBy || {
			'FOOD_ORDER': 'asc',
			'FOOD_ADD_TIME': 'desc'
		};
		let fields = 'FOOD_END_TIME,FOOD_ACCEPT_USER_NAME,FOOD_ACCEPT_USER_ID,FOOD_ACCEPT_TIME,FOOD_OVER_TIME,FOOD_VIEW_CNT,FOOD_FAV_CNT,FOOD_CATE_NAME,FOOD_STATUS,FOOD_ORDER,FOOD_ADD_TIME,FOOD_USER_ID,FOOD_OBJ,user.USER_NAME';

		let where = {};
		where.and = {
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		if (util.isDefined(search) && search) {
			where.or = [
				{ 'user.USER_NAME': ['like', search] },
				{ 'FOOD_CATE_NAME': ['like', search] },
				{ 'FOOD_ACCEPT_USER_NAME': ['like', search] },
				{ 'FOOD_OBJ.title': ['like', search] },
				{ 'FOOD_OBJ.address': ['like', search] },
				{ 'FOOD_OBJ.poster': ['like', search] },
				{ 'FOOD_OBJ.tel': ['like', search] },
			];

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
				case 'top': {
					where.and.FOOD_ORDER = 0;
					break;
				}
				case 'sort': {
					orderBy = this.fmtOrderBySort(sortVal, 'FOOD_ADD_TIME');
					break;
				}

			}
		}

		let joinParams = {
			from: UserModel.CL,
			localField: 'FOOD_USER_ID',
			foreignField: 'USER_MINI_OPENID',
			as: 'user',
		};

		return await FoodModel.getListJoin(joinParams, where, fields, orderBy, page, size, isTotal, oldTotal);
	}

	// #####################导出数据
	/**获取数据 */
	async getFoodDataURL() {
		return await exportUtil.getExportDataURL(EXPORT_FOOD_DATA_KEY);
	}

	/**删除数据 */
	async deleteFoodDataExcel() {
		return await exportUtil.deleteDataExcel(EXPORT_FOOD_DATA_KEY);
	}

	/**导出数据 */
	async exportFoodDataExcel({
		fields,
		status,
		start,
		end,
	}) {
		this.AppError('[跑腿]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}
}

module.exports = AdminFoodService;