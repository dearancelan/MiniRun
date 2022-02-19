module.exports = {
	PID: 'A00',

	NAV_COLOR: '#ffffff',
	NAV_BG: '#11406C',

	MEET_LIST_MODE: 'leftbig', //bigtext,leftbig,leftbig2,leftbig3,leftpic,rightpic,upimg

	MENU_ITEM: ['首页', '预约', '我的'], // 第1,4,5菜单

	NEWS_CATE: '1=学校概况,2=校园资讯,3=校园风光,4=德育工作,5=教师园地,6=学生天地,7=校友情深',
	MEET_TYPE: '1=来访预约,2=校园活动',

	DEFAULT_FORMS: [{
			type: 'line',
			title: '姓名',
			desc: '请填写您的姓名',
			must: true,
			len: 50,
			onlySet: {
				mode: 'all',
				cnt: -1
			},
			selectOptions: ['', ''],
			mobileTruth: true,
			checkBoxLimit: 2,
		},
		{
			type: 'line',
			title: '手机',
			desc: '请填写您的手机号码',
			must: true,
			len: 50,
			onlySet: {
				mode: 'all',
				cnt: -1
			},
			selectOptions: ['', ''],
			mobileTruth: true,
			checkBoxLimit: 2,
		}
	]
}