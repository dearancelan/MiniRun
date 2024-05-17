/**
 * Notes: 陪替服务
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2024-05-16 04:00:00 
 */


const BaseProjectModel = require('./base_project_model.js');

class FollowModel extends BaseProjectModel {

}

// 集合名
FollowModel.CL = BaseProjectModel.C('follow');

FollowModel.DB_STRUCTURE = {
	_pid: 'string|true',

	FOLLOW_ID: 'string|true',

	FOLLOW_STATUS: 'int|true|default=0|comment=状态 0=待处理,1=在处理,9=已完成',
	FOLLOW_END_TIME: 'int|false|default=0|comment=截止时间',

	FOLLOW_CATE_ID: 'string|true|default=0|comment=分类',
	FOLLOW_CATE_NAME: 'string|false|comment=分类冗余',
	FOLLOW_ORDER: 'int|true|default=9999',
	FOLLOW_VOUCH: 'int|true|default=0',

	FOLLOW_USER_ID: 'string|true|comment=发布用户ID',
	FOLLOW_USER_NAME: 'string|false',

	FOLLOW_ACCEPT_USER_ID: 'string|false|comment=接单用户ID',
	FOLLOW_ACCEPT_USER_NAME: 'string|false|comment=接单用户名',
	FOLLOW_ACCEPT_TIME: 'int|true|default=0',   
 
	FOLLOW_OVER_TIME: 'int|true|default=0',   

	FOLLOW_DAY: 'string|false|comment=日期',

	FOLLOW_FORMS: 'array|true|default=[]',
	FOLLOW_OBJ: 'object|true|default={}',

	FOLLOW_FAV_CNT: 'int|true|default=0',
	FOLLOW_FAV_LIST: 'array|true|default=[]',
	FOLLOW_VIEW_CNT: 'int|true|default=0',   

	FOLLOW_QR: 'string|false',

	FOLLOW_ADD_TIME: 'int|true',
	FOLLOW_EDIT_TIME: 'int|true',
	FOLLOW_ADD_IP: 'string|false',
	FOLLOW_EDIT_IP: 'string|false',

};

// 字段前缀
FollowModel.FIELD_PREFIX = "FOLLOW_";

module.exports = FollowModel;