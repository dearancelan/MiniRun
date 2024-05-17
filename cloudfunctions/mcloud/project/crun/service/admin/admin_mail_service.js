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
const MailModel = require('../../model/mail_model.js');
const UserModel = require('../../model/user_model.js');
const MailService = require('../mail_service.js');

// 导出数据KEY
const EXPORT_MAIL_DATA_KEY = 'EXPORT_MAIL_DATA';

class AdminMailService extends BaseProjectAdminService {

	async sortMail(id, sort) {
		sort = Number(sort);
		let data = {};
		data.MAIL_ORDER = sort;
		await MailModel.edit(id, data);
	}

	async getAdminMailList({
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
			'MAIL_ORDER': 'asc',
			'MAIL_ADD_TIME': 'desc'
		};
		let fields = 'MAIL_END_TIME,MAIL_ACCEPT_USER_NAME,MAIL_ACCEPT_USER_ID,MAIL_ACCEPT_TIME,MAIL_OVER_TIME,MAIL_VIEW_CNT,MAIL_FAV_CNT,MAIL_CATE_NAME,MAIL_STATUS,MAIL_ORDER,MAIL_ADD_TIME,MAIL_USER_ID,MAIL_OBJ,user.USER_NAME';

		let where = {};
		where.and = {
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		if (util.isDefined(search) && search) {
			where.or = [
				{ 'user.USER_NAME': ['like', search] },
				{ 'MAIL_CATE_NAME': ['like', search] },
				{ 'MAIL_ACCEPT_USER_NAME': ['like', search] },
				{ 'MAIL_OBJ.title': ['like', search] },
				{ 'MAIL_OBJ.address': ['like', search] },
				{ 'MAIL_OBJ.poster': ['like', search] },
				{ 'MAIL_OBJ.tel': ['like', search] },
			];

		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'cateId': {
					where.and.MAIL_CATE_ID = String(sortVal);
					break;
				}
				case 'status': {
					where.and.MAIL_STATUS = Number(sortVal);
					break;
				}
				case 'timeout': { //过期
					where.and.MAIL_STATUS = 0;
					where.and.MAIL_END_TIME = ['<', this._timestamp]
					break;
				}
				case 'wait': { //待接单
					where.and.MAIL_STATUS = 0;
					where.and.MAIL_END_TIME = ['>=', this._timestamp]
					break;
				}
				case 'top': {
					where.and.MAIL_ORDER = 0;
					break;
				}
				case 'sort': {
					orderBy = this.fmtOrderBySort(sortVal, 'MAIL_ADD_TIME');
					break;
				}

			}
		}

		let joinParams = {
			from: UserModel.CL,
			localField: 'MAIL_USER_ID',
			foreignField: 'USER_MINI_OPENID',
			as: 'user',
		};

		return await MailModel.getListJoin(joinParams, where, fields, orderBy, page, size, isTotal, oldTotal);
	}

	// #####################导出数据
	/**获取数据 */
	async getMailDataURL() {
		return await exportUtil.getExportDataURL(EXPORT_MAIL_DATA_KEY);
	}

	/**删除数据 */
	async deleteMailDataExcel() {
		return await exportUtil.deleteDataExcel(EXPORT_MAIL_DATA_KEY);
	}

	/**导出数据 */
	async exportMailDataExcel({
		fields,
		status,
		start,
		end,
	}) {
		this.AppError('[跑腿]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}
}

module.exports = AdminMailService;