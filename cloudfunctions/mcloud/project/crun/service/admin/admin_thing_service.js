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
const ThingModel = require('../../model/thing_model.js');
const UserModel = require('../../model/user_model.js');
const ThingService = require('../thing_service.js');

// 导出数据KEY
const EXPORT_THING_DATA_KEY = 'EXPORT_THING_DATA';

class AdminThingService extends BaseProjectAdminService {

	async sortThing(id, sort) {
		sort = Number(sort);
		let data = {};
		data.THING_ORDER = sort;
		await ThingModel.edit(id, data);
	}

	async getAdminThingList({
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
			'THING_ORDER': 'asc',
			'THING_ADD_TIME': 'desc'
		};
		let fields = 'THING_END_TIME,THING_ACCEPT_USER_NAME,THING_ACCEPT_USER_ID,THING_ACCEPT_TIME,THING_OVER_TIME,THING_VIEW_CNT,THING_FAV_CNT,THING_CATE_NAME,THING_STATUS,THING_ORDER,THING_ADD_TIME,THING_USER_ID,THING_OBJ,user.USER_NAME';

		let where = {};
		where.and = {
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		if (util.isDefined(search) && search) {
			where.or = [
				{ 'user.USER_NAME': ['like', search] },
				{ 'THING_CATE_NAME': ['like', search] },
				{ 'THING_ACCEPT_USER_NAME': ['like', search] },
				{ 'THING_OBJ.title': ['like', search] },
				{ 'THING_OBJ.address': ['like', search] },
				{ 'THING_OBJ.poster': ['like', search] },
				{ 'THING_OBJ.tel': ['like', search] },
			];

		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'cateId': {
					where.and.THING_CATE_ID = String(sortVal);
					break;
				}
				case 'status': {
					where.and.THING_STATUS = Number(sortVal);
					break;
				}
				case 'timeout': { //过期
					where.and.THING_STATUS = 0;
					where.and.THING_END_TIME = ['<', this._timestamp]
					break;
				}
				case 'wait': { //待接单
					where.and.THING_STATUS = 0;
					where.and.THING_END_TIME = ['>=', this._timestamp]
					break;
				}
				case 'top': {
					where.and.THING_ORDER = 0;
					break;
				}
				case 'sort': {
					orderBy = this.fmtOrderBySort(sortVal, 'THING_ADD_TIME');
					break;
				}

			}
		}

		let joinParams = {
			from: UserModel.CL,
			localField: 'THING_USER_ID',
			foreignField: 'USER_MINI_OPENID',
			as: 'user',
		};

		return await ThingModel.getListJoin(joinParams, where, fields, orderBy, page, size, isTotal, oldTotal);
	}

	// #####################导出数据
	/**获取数据 */
	async getThingDataURL() {
		return await exportUtil.getExportDataURL(EXPORT_THING_DATA_KEY);
	}

	/**删除数据 */
	async deleteThingDataExcel() {
		return await exportUtil.deleteDataExcel(EXPORT_THING_DATA_KEY);
	}

	/**导出数据 */
	async exportThingDataExcel({
		fields,
		status,
		start,
		end,
	}) {
		this.AppError('[跑腿]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}
}

module.exports = AdminThingService;