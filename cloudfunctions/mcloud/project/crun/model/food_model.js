/**
 * Notes: 外卖实体
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2024-03-23 04:00:00 
 */


const BaseProjectModel = require('./base_project_model.js');

class FoodModel extends BaseProjectModel {

}

// 集合名
FoodModel.CL = BaseProjectModel.C('food');

FoodModel.DB_STRUCTURE = {
	_pid: 'string|true',

	FOOD_ID: 'string|true',

	FOOD_STATUS: 'int|true|default=0|comment=状态 0=待处理,1=在处理,9=已完成',
	FOOD_END_TIME: 'int|false|default=0|comment=截止时间',

	FOOD_CATE_ID: 'string|true|default=0|comment=分类',
	FOOD_CATE_NAME: 'string|false|comment=分类冗余',
	FOOD_ORDER: 'int|true|default=9999',
	FOOD_VOUCH: 'int|true|default=0',

	FOOD_USER_ID: 'string|true|comment=发布用户ID',
	FOOD_USER_NAME: 'string|false',

	FOOD_ACCEPT_USER_ID: 'string|false|comment=接单用户ID',
	FOOD_ACCEPT_USER_NAME: 'string|false|comment=接单用户名',
	FOOD_ACCEPT_TIME: 'int|true|default=0',

	FOOD_OVER_TIME: 'int|true|default=0',

	FOOD_DAY: 'string|false|comment=日期',

	FOOD_FORMS: 'array|true|default=[]',
	FOOD_OBJ: 'object|true|default={}',

	FOOD_FAV_CNT: 'int|true|default=0',
	FOOD_FAV_LIST: 'array|true|default=[]',
	FOOD_VIEW_CNT: 'int|true|default=0',

	FOOD_QR: 'string|false',

	FOOD_ADD_TIME: 'int|true',
	FOOD_EDIT_TIME: 'int|true',
	FOOD_ADD_IP: 'string|false',
	FOOD_EDIT_IP: 'string|false',

};

// 字段前缀
FoodModel.FIELD_PREFIX = "FOOD_";

module.exports = FoodModel;