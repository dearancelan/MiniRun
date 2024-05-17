/**
 * Notes: 兼职实体
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2024-03-23 04:00:00 
 */


const BaseProjectModel = require('./base_project_model.js');

class MailModel extends BaseProjectModel {

}

// 集合名
MailModel.CL = BaseProjectModel.C('mail');

MailModel.DB_STRUCTURE = {
	_pid: 'string|true',

	MAIL_ID: 'string|true',

	MAIL_STATUS: 'int|true|default=0|comment=状态 0=待处理,1=在处理,9=已完成',
	MAIL_END_TIME: 'int|false|default=0|comment=截止时间',

	MAIL_CATE_ID: 'string|true|default=0|comment=分类',
	MAIL_CATE_NAME: 'string|false|comment=分类冗余',
	MAIL_ORDER: 'int|true|default=9999',
	MAIL_VOUCH: 'int|true|default=0',

	MAIL_USER_ID: 'string|true|comment=发布用户ID',
	MAIL_USER_NAME: 'string|false',

	MAIL_ACCEPT_USER_ID: 'string|false|comment=接单用户ID',
	MAIL_ACCEPT_USER_NAME: 'string|false|comment=接单用户名',
	MAIL_ACCEPT_TIME: 'int|true|default=0',   
 
	MAIL_OVER_TIME: 'int|true|default=0',   

	MAIL_DAY: 'string|false|comment=日期',

	MAIL_FORMS: 'array|true|default=[]',
	MAIL_OBJ: 'object|true|default={}',

	MAIL_FAV_CNT: 'int|true|default=0',
	MAIL_FAV_LIST: 'array|true|default=[]',
	MAIL_VIEW_CNT: 'int|true|default=0',   

	MAIL_QR: 'string|false',

	MAIL_ADD_TIME: 'int|true',
	MAIL_EDIT_TIME: 'int|true',
	MAIL_ADD_IP: 'string|false',
	MAIL_EDIT_IP: 'string|false',

};

// 字段前缀
MailModel.FIELD_PREFIX = "MAIL_";

module.exports = MailModel;