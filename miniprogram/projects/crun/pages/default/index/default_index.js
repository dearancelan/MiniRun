const pageHelper = require('../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../helper/cloud_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);

	},

	setDM: function (data) {
		// 处理弹幕参数
		const dmArr = [];
		for (let i = 0; i < data.length; i++) {
			let time = Math.floor(Math.random() * 10);
			let second = Math.floor(Math.random() * 60);
			let _time = time < 6 ? 6 + i : time + i;
			let top = Math.floor(Math.random() * 80) + 2;
			let node = {
				title: data[i].title,
				top,
				second,
				time: _time,
			};
			dmArr.push(node);
		}
		this.setData({
			dmData: dmArr
		});
	},

	_loadList: async function () {
		let opts = {
			title: 'bar'
		}
		await cloudHelper.callCloudSumbit('home/list', {}, opts).then(res => {
			this.setData({
				...res.data
			}, () => {
				this.setData({ isLoad: true });
				this.setDM(res.data.list);
			});
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () { },

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: async function () {
		this._loadList();
	},

	onPullDownRefresh: async function () {
		await this._loadList();
		wx.stopPullDownRefresh();
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	url: async function (e) {
		pageHelper.url(e, this);
	},


	bindCurTap: function (e) {
		let cur = pageHelper.dataset(e, 'cur');
		this.setData({ cur });
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},
})