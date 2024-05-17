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
const MailModel = require('../model/mail_model.js');
const UserModel = require('../model/user_model.js');

class MailService extends BaseProjectService {

	// 获取当前状态
	getStatusDesc(mail) {
	 
	}

	/** 接单 */
	async acceptMail(userId, id) {

		this.AppError('[跑腿]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/** 取消我的订单 */
	async cancelMail(userId, id) {
		this.AppError('[跑腿]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/** 浏览 */
	async viewMail(id) {
		let fields = '*';

		let where = {
			_id: id,
			//MAIL_STATUS: 1
		}

		let mail = await MailModel.getOne(where, fields);
		if (!mail) return null;

		// 接单人信息
		if (mail.MAIL_STATUS > 0 && mail.MAIL_ACCEPT_USER_ID) {
			mail.acceptUser = await UserModel.getOne({ USER_MINI_OPENID: mail.MAIL_ACCEPT_USER_ID }, 'USER_NAME,USER_MOBILE');
		}

		MailModel.inc(id, 'MAIL_VIEW_CNT', 1);

		return mail;
	}

	/** 获取 */
	async getMailDetail(id) {
		return await MailModel.getOne(id);
	}

	/**修改状态 */
	async statusMail(userId, id, status) {
		this.AppError('[跑腿]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	/** 删除 */
	async delMail(userId, id) {
		this.AppError('[跑腿]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/** 插入 */
	async insertMail(userId, {
	 
	}) {
		this.AppError('[跑腿]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/** 修改 */
	async editMail(userId, {
	 
	}) {

		this.AppError('[跑腿]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/** 更新forms信息 */
	async updateMailForms({
		id,
		hasImageForms
	}) {
		this.AppError('[跑腿]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/** 列表与搜索 */
	async getMailList(userId, {
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
			'MAIL_ORDER': 'asc',
			'MAIL_ADD_TIME': 'desc'
		};
		let fields = 'MAIL_ACCEPT_USER_ID,MAIL_END_TIME,MAIL_STATUS,MAIL_ADD_TIME,MAIL_USER_ID,MAIL_OBJ';

		let where = {};
		where.and = {
			//MAIL_STATUS: 1,
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};


		if (util.isDefined(search) && search) {
			if (search == '我的发布') {
				where.and.MAIL_USER_ID = userId;
			}
			else if (search == '我的接单') {
				where.and.MAIL_ACCEPT_USER_ID = userId;
			}
			else if (search == '我的收藏') {
				where.and.MAIL_FAV_LIST = userId;
			}

			else {
				where.or = [
					{ 'MAIL_OBJ.title': ['like', search] },
					{ 'MAIL_OBJ.poster': ['like', search] },
					{ 'MAIL_OBJ.tel': ['like', search] },
				];
			}

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
				case 'sort': {
					orderBy = this.fmtOrderBySort(sortVal, 'MAIL_ADD_TIME');
					break;
				}
			}
		}

		return await MailModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);

	}

}

module.exports = MailService;