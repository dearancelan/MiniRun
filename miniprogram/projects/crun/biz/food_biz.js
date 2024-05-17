/**
 * Notes: 评论模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2023-06-24 07:48:00 
 */

const BaseBiz = require('../../../comm/biz/base_biz.js');
const projectSetting = require('../public/project_setting.js');

class FoodBiz extends BaseBiz {
	static initFormData() {
		let cateIdOptions = FoodBiz.getCateList();

		return {
			cateIdOptions,

			fields: projectSetting.FOOD_FIELDS,

			formCateId: (cateIdOptions.length == 1) ? cateIdOptions[0].val : '',
			formOrder: 9999,
			formEnd: '',

			formForms: [],
		}

	}

	static getCateName(cateId) {
		let cateList = projectSetting.FOOD_CATE;

		for (let k = 0; k < cateList.length; k++) {
			if (cateList[k].id == cateId) {
				return cateList[k].title;
			}
		}
		return '';
	}

	static getCateList() {

		let cateList = projectSetting.FOOD_CATE;

		let arr = [];
		for (let k = 0; k < cateList.length; k++) {
			arr.push({
				label: cateList[k].title,
				type: 'cateId',
				val: cateList[k].id, //for options form
				value: cateList[k].id, //for list menu
			})
		}

		return arr;
	}
 
}
FoodBiz.CHECK_FORM = {
	cateId: 'formCateId|must|id|name=分类',
	order: 'formOrder|must|int|min:0|max:9999|name=排序号',
	end: 'formEnd|must|string|name=接单截止时间',
	forms: 'formForms|array',
};

module.exports = FoodBiz;