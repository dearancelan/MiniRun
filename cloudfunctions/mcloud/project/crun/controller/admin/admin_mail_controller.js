/**
 * Notes: 资讯模块后台管理-控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2021-07-11 10:20:00 
 */

const BaseProjectAdminController = require('./base_project_admin_controller.js');

const AdminMailService = require('../../service/admin/admin_mail_service.js');
const MailService = require('../../service/mail_service.js');
const timeUtil = require('../../../../framework/utils/time_util.js');

class AdminMailController extends BaseProjectAdminController {

	async getAdminMailDetail() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new MailService();
		return await service.getMailDetail(input.id);

	}

	async sortMail() {
		await this.isAdmin();

		let rules = {
			id: 'must|id',
			sort: 'must|int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminMailService();
		await service.sortMail(input.id, input.sort);
	}

	async statusMail() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
			status: 'must|int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new MailService();
		return await service.statusMail(null, input.id, input.status); 
	}

	async delMail() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new MailService();
		await service.delMail(null, input.id);

	}

	async getAdminMailList() {
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

		let service = new AdminMailService();
		let mailService = new MailService();
		let result = await service.getAdminMailList(input);

		// 数据格式化
		let list = result.list;
		for (let k = 0; k < list.length; k++) {
			list[k].status = mailService.getStatusDesc(list[k]);

			list[k].MAIL_ADD_TIME = timeUtil.timestamp2Time(list[k].MAIL_ADD_TIME, 'Y-M-D h:m:s');
			list[k].MAIL_ACCEPT_TIME = timeUtil.timestamp2Time(list[k].MAIL_ACCEPT_TIME, 'Y-M-D h:m:s');
			list[k].MAIL_OVER_TIME = timeUtil.timestamp2Time(list[k].MAIL_OVER_TIME, 'Y-M-D h:m:s');

			list[k].end = timeUtil.timestamp2Time(list[k].MAIL_END_TIME, 'Y-M-D h:m:s');

			if (list[k].MAIL_OBJ && list[k].MAIL_OBJ.content)
				delete list[k].MAIL_OBJ.content;
		}
		result.list = list;

		return result;

	}

	/************** 用户数据导出 BEGIN ********************* */
	/** 当前是否有导出文件生成 */
	async mailDataGet() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			isDel: 'int|must', //是否删除已有记录
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminMailService();

		if (input.isDel === 1)
			await service.deleteMailDataExcel(); //先删除 

		return await service.getMailDataURL();
	}

	/** 导出数据 */
	async mailDataExport() {
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

		let service = new AdminMailService();
		return await service.exportMailDataExcel(input);
	}

	/** 删除导出的用户数据 */
	async mailDataDel() {
		await this.isAdmin();

		// 数据校验
		let rules = {};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminMailService();
		return await service.deleteMailDataExcel();
	}
}

module.exports = AdminMailController;