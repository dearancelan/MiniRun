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
const ThingModel = require('../model/thing_model.js');
const UserModel = require('../model/user_model.js');

class ThingService extends BaseProjectService {

	// 获取当前状态
	getStatusDesc(thing) {
		 
	}

	/** 接单 */
	async acceptThing(userId, id) {

		this.AppError('[跑腿]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/** 取消我的订单 */
	async cancelThing(userId, id) {
		this.AppError('[跑腿]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/** 浏览 */
	async viewThing(id) {
		let fields = '*';

		let where = {
			_id: id,
			//THING_STATUS: 1
		}

		let thing = await ThingModel.getOne(where, fields);
		if (!thing) return null;

		// 接单人信息
		if (thing.THING_STATUS > 0 && thing.THING_ACCEPT_USER_ID) {
			thing.acceptUser = await UserModel.getOne({ USER_MINI_OPENID: thing.THING_ACCEPT_USER_ID }, 'USER_NAME,USER_MOBILE');
		}

		ThingModel.inc(id, 'THING_VIEW_CNT', 1);

		return thing;
	}

	/** 获取 */
	async getThingDetail(id) {
		return await ThingModel.getOne(id);
	}

	/**修改状态 */
	async statusThing(userId, id, status) {
		this.AppError('[跑腿]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	/** 删除 */
	async delThing(userId, id) {
		this.AppError('[跑腿]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/** 插入 */
	async insertThing(userId, {
	 
	}) {
		this.AppError('[跑腿]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/** 修改 */
	async editThing(userId, {
		 
	}) {

		this.AppError('[跑腿]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/** 更新forms信息 */
	async updateThingForms({
		id,
		hasImageForms
	}) {
		this.AppError('[跑腿]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/** 列表与搜索 */
	async getThingList(userId, {
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
			'THING_ORDER': 'asc',
			'THING_ADD_TIME': 'desc'
		};
		let fields = 'THING_USER_ID,THING_ACCEPT_USER_ID,THING_END_TIME,THING_STATUS,THING_ADD_TIME,THING_USER_ID,THING_OBJ,user.USER_PIC';

		let where = {};
		where.and = {
			//THING_STATUS: 1,
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};


		if (util.isDefined(search) && search) {
			if (search == '我的发布') {
				where.and.THING_USER_ID = userId;
			}
			else if (search == '我的接单') {
				where.and.THING_ACCEPT_USER_ID = userId;
			}
			else if (search == '我的收藏') {
				where.and.THING_FAV_LIST = userId;
			}

			else {
				where.or = [
					{ 'THING_OBJ.title': ['like', search] },
					{ 'THING_OBJ.poster': ['like', search] },
					{ 'THING_OBJ.tel': ['like', search] },
				];
			}

		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'cateId': {
					where.and.THING_CATE_ID = String(sortVal);
					break;
				}
				case 'status': {
					where.and.THING_STATUS = Number(sortVal);
					break;
				}
				case 'timeout': { //过期
					where.and.THING_STATUS = 0;
					where.and.THING_END_TIME = ['<', this._timestamp]
					break;
				}
				case 'wait': { //待接单
					where.and.THING_STATUS = 0;
					where.and.THING_END_TIME = ['>=', this._timestamp]
					break;
				}
				case 'sort': {
					orderBy = this.fmtOrderBySort(sortVal, 'THING_ADD_TIME');
					break;
				}
			}
		}

		let joinParams = {
			from: UserModel.CL,
			localField: 'THING_USER_ID',
			foreignField: 'USER_MINI_OPENID',
			as: 'user',
		};

		return await ThingModel.getListJoin(joinParams, where, fields, orderBy, page, size, isTotal, oldTotal);

	}

}

module.exports = ThingService;