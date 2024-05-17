let behavior = require('../../../biz/project_index_bh.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const FoodBiz = require('../../../biz/food_biz.js');

Page({

	behaviors: [behavior],

	/**
	 * 页面的初始数据
	 */
	data: {
		type: 'food'
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this._onLoad(options);
	},

	bindMyTap: function (e) {
		let itemList = ['我的发布', '我的接单', '我的收藏'];
		wx.showActionSheet({
			itemList,
			success: async res => {
				switch (res.tapIndex) {
					case 0: {
						this._setMy(this, '我的发布');
						break;
					}
					case 1: {
						this._setMy(this, '我的接单');
						break;
					}
					case 2: {
						this._setMy(this, '我的收藏');
						break;
					}
				}
			},
			fail: function (err) { }
		})
	},

	bindStatusTap: function (e) {
		let itemList = ['设为待接单', '设为已完成'];
		let id = pageHelper.dataset(e, 'id');
		wx.showActionSheet({
			itemList,
			success: async res => {
				switch (res.tapIndex) {
					case 0: { //待接单 
						await this._setStatus(id, 0);
						break;
					}
					case 1: { //已完成
						await this._setStatus(id, 9);
						break;
					}
				}
			},
			fail: function (err) { }
		})
	},

	_getSearchMenu: function () {

		let sortItems = [];

		if (FoodBiz.getCateList().length > 2) {
			let sortItem1 = [
				{ label: '分类', type: 'cateId', value: '' }
			];
			sortItem1 = sortItem1.concat(FoodBiz.getCateList());

			sortItems = [sortItems1];
		} 

		let sortMenus = [{ label: '待接单', type: 'wait', value: 'wait' }]; 

		sortMenus = sortMenus.concat([ 
			{ label: '已接单', type: 'status', value: '1' },
			{ label: '已完成', type: 'status', value: '9' },
			{ label: '已过期', type: 'timeout', value: 'timeout' },
			{ label: '全部', type: 'all', value: '' }
		]);



		this.setData({
			isLoad: true,
			sortItems,
			sortMenus,
			_params:{
				sortType:'wait',
				sortVal:'wait'
			}
		})

	},
})