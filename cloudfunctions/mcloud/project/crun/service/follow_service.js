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
const FollowModel = require('../model/follow_model.js');
const UserModel = require('../model/user_model.js');

class FollowService extends BaseProjectService {

	// 获取当前状态
	getStatusDesc(follow) {
		 
	}

	/** 接单 */
	async acceptFollow(userId, id) {

		this.AppError('[跑腿]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/** 取消我的订单 */
	async cancelFollow(userId, id) {
		this.AppError('[跑腿]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/** 浏览 */
	async viewFollow(id) {
		let fields = '*';

		let where = {
			_id: id,
			//FOLLOW_STATUS: 1
		}

		let follow = await FollowModel.getOne(where, fields);
		if (!follow) return null;

		// 接单人信息
		if (follow.FOLLOW_STATUS > 0 && follow.FOLLOW_ACCEPT_USER_ID) {
			follow.acceptUser = await UserModel.getOne({ USER_MINI_OPENID: follow.FOLLOW_ACCEPT_USER_ID }, 'USER_NAME,USER_MOBILE');
		}

		FollowModel.inc(id, 'FOLLOW_VIEW_CNT', 1);

		return follow;
	}

	/** 获取 */
	async getFollowDetail(id) {
		return await FollowModel.getOne(id);
	}

	/**修改状态 */
	async statusFollow(userId, id, status) {
		this.AppError('[跑腿]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	/** 删除 */
	async delFollow(userId, id) {
		this.AppError('[跑腿]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/** 插入 */
	async insertFollow(userId, {
	 
	}) {
		this.AppError('[跑腿]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/** 修改 */
	async editFollow(userId, {
		 
	}) {

		this.AppError('[跑腿]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/** 更新forms信息 */
	async updateFollowForms({
		id,
		hasImageForms
	}) {
		this.AppError('[跑腿]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/** 列表与搜索 */
	async getFollowList(userId, {
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
			'FOLLOW_ORDER': 'asc',
			'FOLLOW_ADD_TIME': 'desc'
		};
		let fields = 'FOLLOW_ACCEPT_USER_ID,FOLLOW_END_TIME,FOLLOW_STATUS,FOLLOW_ADD_TIME,FOLLOW_USER_ID,FOLLOW_OBJ';

		let where = {};
		where.and = {
			//FOLLOW_STATUS: 1,
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};


		if (util.isDefined(search) && search) {
			if (search == '我的发布') {
				where.and.FOLLOW_USER_ID = userId;
			}
			else if (search == '我的接单') {
				where.and.FOLLOW_ACCEPT_USER_ID = userId;
			}
			else if (search == '我的收藏') {
				where.and.FOLLOW_FAV_LIST = userId;
			}

			else {
				where.or = [
					{ 'FOLLOW_OBJ.title': ['like', search] },
					{ 'FOLLOW_OBJ.poster': ['like', search] },
					{ 'FOLLOW_OBJ.tel': ['like', search] },
				];
			}

		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'cateId': {
					where.and.FOLLOW_CATE_ID = String(sortVal);
					break;
				}
				case 'status': {
					where.and.FOLLOW_STATUS = Number(sortVal);
					break;
				}
				case 'timeout': { //过期
					where.and.FOLLOW_STATUS = 0;
					where.and.FOLLOW_END_TIME = ['<', this._timestamp]
					break;
				}
				case 'wait': { //待接单
					where.and.FOLLOW_STATUS = 0;
					where.and.FOLLOW_END_TIME = ['>=', this._timestamp]
					break;
				}
				case 'sort': {
					orderBy = this.fmtOrderBySort(sortVal, 'FOLLOW_ADD_TIME');
					break;
				}
			}
		}

		return await FollowModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);

	}

}

module.exports = FollowService;