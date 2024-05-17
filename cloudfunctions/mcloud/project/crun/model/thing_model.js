/**
 * Notes: 兼职实体
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2024-03-23 04:00:00 
 */


const BaseProjectModel = require('./base_project_model.js');

class ThingModel extends BaseProjectModel {

}

// 集合名
ThingModel.CL = BaseProjectModel.C('thing');

ThingModel.DB_STRUCTURE = {
	_pid: 'string|true',

	THING_ID: 'string|true',

	THING_STATUS: 'int|true|default=0|comment=状态 0=待处理,1=在处理,9=已完成',
	THING_END_TIME: 'int|false|default=0|comment=截止时间',

	THING_CATE_ID: 'string|true|default=0|comment=分类',
	THING_CATE_NAME: 'string|false|comment=分类冗余',
	THING_ORDER: 'int|true|default=9999',
	THING_VOUCH: 'int|true|default=0',

	THING_USER_ID: 'string|true|comment=发布用户ID',
	THING_USER_NAME: 'string|false',

	THING_ACCEPT_USER_ID: 'string|false|comment=接单用户ID',
	THING_ACCEPT_USER_NAME: 'string|false|comment=接单用户名',
	THING_ACCEPT_TIME: 'int|true|default=0',   
 
	THING_OVER_TIME: 'int|true|default=0',   

	THING_DAY: 'string|false|comment=日期',

	THING_FORMS: 'array|true|default=[]',
	THING_OBJ: 'object|true|default={}',

	THING_FAV_CNT: 'int|true|default=0',
	THING_FAV_LIST: 'array|true|default=[]',
	THING_VIEW_CNT: 'int|true|default=0',   

	THING_QR: 'string|false',

	THING_ADD_TIME: 'int|true',
	THING_EDIT_TIME: 'int|true',
	THING_ADD_IP: 'string|false',
	THING_EDIT_IP: 'string|false',

};

// 字段前缀
ThingModel.FIELD_PREFIX = "THING_";

module.exports = ThingModel;