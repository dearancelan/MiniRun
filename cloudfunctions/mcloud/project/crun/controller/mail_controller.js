/**
 * Notes: 兼职模块控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2024-03-23 04:00:00 
 */

const BaseProjectController = require('./base_project_controller.js');
const MailService = require('../service/mail_service.js');
const timeUtil = require('../../../framework/utils/time_util.js');
const contentCheck = require('../../../framework/validate/content_check.js');

class MailController extends BaseProjectController { 

	/** 接单 */
	async acceptMail() {
		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new MailService();
		return await service.acceptMail(this._userId, input.id);
	}

	/** 取消接单 */
	async cancelMail() {
		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new MailService();
		return await service.cancelMail(this._userId, input.id);
	}

	/** 获取信息用于编辑修改 */
	async getMailDetail() {

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new MailService();
		let mail = await service.getMailDetail(input.id);
		if (mail) {
			mail.MAIL_END_TIME = timeUtil.timestamp2Time(mail.MAIL_END_TIME, 'Y-M-D h:m');
		}

		return mail;

	}

	/** 浏览详细 */
	async viewMail() {
		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new MailService();
		let mail = await service.viewMail(input.id);

		if (mail) { 
			mail.end = timeUtil.timestamp2Time(mail.MAIL_END_TIME, 'Y/M/D h:m:s');
			mail.end2 = timeUtil.timestamp2Time(mail.MAIL_END_TIME, 'Y-M-D h:m');

			mail.MAIL_ADD_TIME = timeUtil.timestamp2Time(mail.MAIL_ADD_TIME, 'Y-M-D h:m');
			mail.MAIL_ACCEPT_TIME = timeUtil.timestamp2Time(mail.MAIL_ACCEPT_TIME, 'Y-M-D h:m');
			mail.MAIL_OVER_TIME = timeUtil.timestamp2Time(mail.MAIL_OVER_TIME, 'Y-M-D h:m');

			mail.status = service.getStatusDesc(mail);

			mail.myaccept = (mail.MAIL_ACCEPT_USER_ID === this._userId);
			mail.mypost = (mail.MAIL_USER_ID === this._userId);

		}

		return mail;
	}

	/** 状态修改 */
	async statusMail() {
		// 数据校验
		let rules = {
			id: 'must|id',
			status: 'must|int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new MailService();
		return await service.statusMail(this._userId, input.id, input.status);

	}

	/** 列表与搜索 */
	async getMailList() {

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

		let service = new MailService();
		let result = await service.getMailList(this._userId, input);

		// 数据格式化
		let list = result.list;

		for (let k = 0; k < list.length; k++) {
			list[k].status = service.getStatusDesc(list[k]);

			list[k].MAIL_ADD_TIME = timeUtil.timestamp2Time(list[k].MAIL_ADD_TIME, 'Y-M-D h:m');
			list[k].end = timeUtil.timestamp2Time(list[k].MAIL_END_TIME, 'M月D日 h:m');

			// 删除冗余
			if (list[k].MAIL_OBJ.content) delete list[k].MAIL_OBJ.content;

			list[k].myaccept = (list[k].MAIL_ACCEPT_USER_ID === this._userId);
			list[k].mypost = (list[k].MAIL_USER_ID === this._userId);

		}

		return result;

	}

	/** 发布 */
	async insertMail() {

		// 数据校验 
		let rules = {
			 
		};


		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiClient(input);

		let service = new MailService();
		let result = await service.insertMail(this._userId, input);

		return result;

	}

	/** 修改 */
	async editMail() {

		// 数据校验 
		let rules = {
		 
		};


		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiClient(input);

		let service = new MailService();
		return await service.editMail(this._userId, input); 

	}

	/** 更新图片信息 */
	async updateMailForms() {

		// 数据校验
		let rules = {
			 
		};

		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiClient(input);

		let service = new MailService();
		return await service.updateMailForms(input);
	}

	/** 删除 */
	async delMail() {

		// 数据校验
		let rules = {
			id: 'must|id',
			isAdmin: 'must|bool'
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new MailService();
		await service.delMail(this._userId, input.id);

	}

}

module.exports = MailController;