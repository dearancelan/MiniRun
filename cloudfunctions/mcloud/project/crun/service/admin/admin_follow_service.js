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
const FollowModel = require('../../model/follow_model.js');
const UserModel = require('../../model/user_model.js');
const FollowService = require('../follow_service.js');

// 导出数据KEY
const EXPORT_FOLLOW_DATA_KEY = 'EXPORT_FOLLOW_DATA';

class AdminFollowService extends BaseProjectAdminService {

	async sortFollow(id, sort) {
		sort = Number(sort);
		let data = {};
		data.FOLLOW_ORDER = sort;
		await FollowModel.edit(id, data);
	}

	async getAdminFollowList({
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
			'FOLLOW_ORDER': 'asc',
			'FOLLOW_ADD_TIME': 'desc'
		};
		let fields = 'FOLLOW_END_TIME,FOLLOW_ACCEPT_USER_NAME,FOLLOW_ACCEPT_USER_ID,FOLLOW_ACCEPT_TIME,FOLLOW_OVER_TIME,FOLLOW_VIEW_CNT,FOLLOW_FAV_CNT,FOLLOW_CATE_NAME,FOLLOW_STATUS,FOLLOW_ORDER,FOLLOW_ADD_TIME,FOLLOW_USER_ID,FOLLOW_OBJ,user.USER_NAME';

		let where = {};
		where.and = {
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		if (util.isDefined(search) && search) {
			where.or = [
				{ 'user.USER_NAME': ['like', search] },
				{ 'FOLLOW_CATE_NAME': ['like', search] },
				{ 'FOLLOW_ACCEPT_USER_NAME': ['like', search] },
				{ 'FOLLOW_OBJ.title': ['like', search] },
				{ 'FOLLOW_OBJ.address': ['like', search] },
				{ 'FOLLOW_OBJ.poster': ['like', search] },
				{ 'FOLLOW_OBJ.tel': ['like', search] },
			];

		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'cateId': {
					where.and.FOLLOW_CATE_ID = String(sortVal);
					break;
				}
				case 'status': {
					where.and.FOLLOW_STATUS = Number(sortVal);
					break;
				}
				case 'timeout': { //过期
					where.and.FOLLOW_STATUS = 0;
					where.and.FOLLOW_END_TIME = ['<', this._timestamp]
					break;
				}
				case 'wait': { //待接单
					where.and.FOLLOW_STATUS = 0;
					where.and.FOLLOW_END_TIME = ['>=', this._timestamp]
					break;
				}
				case 'top': {
					where.and.FOLLOW_ORDER = 0;
					break;
				}
				case 'sort': {
					orderBy = this.fmtOrderBySort(sortVal, 'FOLLOW_ADD_TIME');
					break;
				}

			}
		}

		let joinParams = {
			from: UserModel.CL,
			localField: 'FOLLOW_USER_ID',
			foreignField: 'USER_MINI_OPENID',
			as: 'user',
		};

		return await FollowModel.getListJoin(joinParams, where, fields, orderBy, page, size, isTotal, oldTotal);
	}

	// #####################导出数据
	/**获取数据 */
	async getFollowDataURL() {
		return await exportUtil.getExportDataURL(EXPORT_FOLLOW_DATA_KEY);
	}

	/**删除数据 */
	async deleteFollowDataExcel() {
		return await exportUtil.deleteDataExcel(EXPORT_FOLLOW_DATA_KEY);
	}

	/**导出数据 */
	async exportFollowDataExcel({
		fields,
		status,
		start,
		end,
	}) {
		this.AppError('[跑腿]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}
}

module.exports = AdminFollowService;