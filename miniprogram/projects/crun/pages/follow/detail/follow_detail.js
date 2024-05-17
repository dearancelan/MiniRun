const cloudHelper = require('../../../../../helper/cloud_helper.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,

		left_time_list: [],//剩余时间转换，天时分秒
		left_time_list_date: [],//在拆分
		timer: '',//定时器
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);

		if (!pageHelper.getOptions(this, options)) return;

		this._loadDetail();

	},

	_loadDetail: async function () {
		let id = this.data.id;
		if (!id) return;

		let params = {
			id,
		};
		let opt = {
			title: 'bar'
		};
		let follow = await cloudHelper.callCloudData('follow/view', params, opt);
		if (!follow) {
			this.setData({
				isLoad: null
			})
			return;
		}

		this.setData({
			isLoad: true,
			follow,
		},()=>{
			this.getLeftTime();
		});

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () { },

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () { 
		this.getLeftTime();
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
		if (this.data.timer) {
			console.log('销毁定时器')
			clearInterval(this.data.timer);
		}
	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: async function () {
		await this._loadDetail();
		wx.stopPullDownRefresh();
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	url: function (e) {
		pageHelper.url(e, this);
	},

	onPageScroll: function (e) {
		// 回页首按钮
		pageHelper.showTopBtn(e, this);

	},

	bindAcceptTap: async function (e) {
		if (!await PassportBiz.loginMustBackWin(this)) return;

		let id = this.data.id;

		let cb = async () => {
			try {
				let params = {
					id
				}

				await cloudHelper.callCloudSumbit('follow/accept', params, {}).then(res => {
					let cb = () => {
						wx.redirectTo({
							url: 'follow_detail?id=' + this.data.id,
						});
					}
					pageHelper.showSuccToast('接单成功', 1500, cb);

				});
			}
			catch (err) {
				console.error(err);
			}
		}
		pageHelper.showConfirm('您确认接单？', cb);
	},

	bindCancelTap: async function (e) {
		if (!await PassportBiz.loginMustBackWin(this)) return;

		let id = this.data.id;

		let cb = async () => {
			try {

				let params = {
					id
				}

				await cloudHelper.callCloudSumbit('follow/cancel', params, {}).then(res => {
					let callback = () => {
						wx.redirectTo({
							url: 'follow_detail?id=' + this.data.id,
						});
					}
					pageHelper.showSuccToast('取消成功', 1500, callback);

				});
			}
			catch (err) {
				console.error(err);
			}
		}
		pageHelper.showConfirm('您确认取消？', cb);

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function (res) {
		return {
			title: this.data.follow.FOLLOW_TITLE,
			imageUrl: this.data.follow.FOLLOW_PIC[0]
		}
	},

	/**
  * 计算剩余时间
  * @param {*} end_time
  */
	getLeftTime() {
		if (!this.data.isLoad) return;
		if (this.data.timer) return;

		let end_time = this.data.follow.end;

		// 获取剩余秒数
		let left_time = this.getTimestap(end_time);
		this.initDate(left_time);
		this.data.timer = setInterval(() => {
			if (left_time-- === 0) {
				this.setData({
					left_time_list: this.formateSeconds(0)
				})
				clearInterval(this.data.timer)
			} else {
				this.initDate(left_time)
			}
		}, 1000)
	},
	/**
	 * 初始化数据
	 * @param {*} e 
	 */
	initDate(e) {
		let left_time_list = this.formateSeconds(e),
			left_time_list_date = this.formatDate(JSON.stringify(left_time_list))
		this.setData({
			left_time_list, left_time_list_date
		})
	},
	/**
	 * 天-时-分-秒
	 * @param {*} e 
	 */
	formateSeconds(e) {
		let time = [],
			day = parseInt(e / 86400),
			hour = parseInt((e % 86400) / 3600),
			min = parseInt(((e % 86400) % 3600) / 60),
			sec = parseInt(((e % 86400) % 3600) % 60);
		time[0] = day > 0 ? this.addZero(day) : this.addZero(0);
		time[1] = hour > 0 ? this.addZero(hour) : this.addZero(0);
		time[2] = min > 0 ? this.addZero(min) : this.addZero(0);
		time[3] = sec > 0 ? this.addZero(sec) : this.addZero(0);
		return time;
	},
	/**
	 * 添0
	 * @param {*} num 
	 */
	addZero(num) {
		return num < 10 ? '0' + num : num;
	},
	/**
	 * 获取指定时间-当前时间的描述
	 * @param {*} end_time 
	 */
	getTimestap(end_time) {
		// 当前时间
		let currentTime = parseInt(new Date().getTime() / 1000);
		// 指定时间
		let futureTime = parseInt(new Date(end_time.replace(/-/g, '/')).getTime() / 1000);
		return futureTime <= currentTime ? 0 : futureTime - currentTime;
	},
	/**
	 * 格式化日期
	 * @param {*} e 
	 */
	formatDate(e) {
		let list = JSON.parse(e);
		for (let i = 0; i < list.length; i++) {
			list[i] = list[i].toString().split('')
		}
		return list;
	},
})