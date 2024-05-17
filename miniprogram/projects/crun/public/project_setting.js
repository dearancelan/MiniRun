module.exports = { //crun
	PROJECT_COLOR: '#FED202',
	NAV_COLOR: '#000000',
	NAV_BG: '#FED202',

	// setup
	SETUP_CONTENT_ITEMS: [
		{ title: '关于我们', key: 'SETUP_CONTENT_ABOUT' },
		{ title: '联系我们', key: 'SETUP_CONTENT_CONTACT' },
	],

	// 用户
	USER_REG_CHECK: false,
	USER_FIELDS: [
		{ mark: 'sex', title: '性别', type: 'select', selectOptions: ['男', '女'], must: true },
		{ mark: 'college', title: '院系', type: 'text', must: true },
		{ mark: 'sub', title: '专业', type: 'text', must: true },
		{ mark: 'address', title: '宿舍楼栋', type: 'text', must: false },
	],
	USER_CHECK_FORM: {
		name: 'formName|must|string|min:1|max:30|name=姓名',
		mobile: 'formMobile|must|mobile|name=手机',
		pic: 'formPic|must|string|name=头像',
		forms: 'formForms|array'
	},

	NEWS_NAME: '通知公告',
	NEWS_CATE: [
		{ id: 1, title: '通知公告', style: 'leftbig1' },

	],
	NEWS_FIELDS: [
	],


	MAIL_NAME: '快递代取',
	MAIL_CATE: [
		{ id: 1, title: '快递代取', style: 'leftbig1' },

	],
	MAIL_FIELDS: [
		{ mark: 'title', title: '快递名称', type: 'text', max: 50, must: true },
		{ mark: 'num', title: '快递件数', type: 'int', must: true },
		{ mark: 'weight', title: '预估重量(kg)', type: 'int', must: true },
		{ mark: 'price', title: '打赏金额(元)', type: 'digit', must: true },
		{ mark: 'poster', title: '联系人', type: 'text', must: true },
		{ mark: 'tel', title: '联系人电话', type: 'mobile', ext: { hint: '请放心填写电话，仅接单后可见' }, must: true },
		{ mark: 'address1', title: '取件地址', type: 'textarea', must: true },
		{ mark: 'address2', title: '送货地址', type: 'textarea', must: true },
		{ mark: 'desc', title: '补充说明', type: 'textarea', must: false },
		{ mark: 'code', title: '取件码', type: 'textarea', ext: { hint: '请放心填写取件码，仅接单后可见' }, must: true },
		{ mark: 'img', title: '相关图片', type: 'image', ext: { hint: '请放心上传，仅接单后可见' }, min: 0, max: 8, must: false },
	],

	THING_NAME: '急事代办',
	THING_CATE: [
		{ id: 1, title: '急事代办', style: 'leftbig1' },

	],
	THING_FIELDS: [
		{ mark: 'title', title: '代办事宜', type: 'text', max: 50, must: true },
		{ mark: 'price', title: '打赏金额(元)', type: 'digit', must: true },
		{ mark: 'level', title: '紧急程度', type: 'select', selectOptions: ['特急', '紧急', '一般'], must: true },
		{ mark: 'poster', title: '联系人', type: 'text', must: true },
		{ mark: 'tel', title: '联系人电话', type: 'mobile', ext: { hint: '请放心填写电话，仅接单后可见' }, must: true },
		{ mark: 'desc', title: '详细描述', type: 'textarea', must: true },
		{ mark: 'img', title: '相关图片', type: 'image', ext: { hint: '请放心上传，仅接单后可见' }, min: 0, max: 8, must: false },
	],

	FOOD_NAME: '代买服务',
	FOOD_CATE: [
		{ id: 1, title: '代买服务', style: 'leftbig1' },

	],
	FOOD_FIELDS: [
		{ mark: 'title', title: '商品', type: 'text', must: true },
		{ mark: 'price', title: '打赏金额(元)', type: 'digit', must: true },
		{ mark: 'address1', title: '商家地址', type: 'textarea', must: true },
		{ mark: 'address2', title: '送货地址', type: 'textarea', must: true },
		{ mark: 'poster', title: '联系人', type: 'text', must: true },
		{ mark: 'tel', title: '联系人电话', type: 'mobile', ext: { hint: '请放心填写电话，仅接单后可见' }, must: true },
		{ mark: 'desc', title: '详细描述', type: 'textarea', must: true },
		{ mark: 'img', title: '相关图片', type: 'image', ext: { hint: '请放心上传，仅接单后可见' }, min: 0, max: 8, must: false },
	],

	FOLLOW_NAME: '陪替服务',
	FOLLOW_CATE: [
		{ id: 1, title: '陪替服务', style: 'leftbig1' },

	],
	FOLLOW_FIELDS: [
		{ mark: 'type', title: '服务类型', type: 'select', selectOptions: ['游戏代练', '替占座位', '替代排队', '学习指导', '行李搬运', '其他'], must: true },
		{ mark: 'price', title: '打赏金额(元)', type: 'digit', must: true },
		{ mark: 'poster', title: '联系人', type: 'text', must: true },
		{ mark: 'tel', title: '联系人电话', type: 'mobile', ext: { hint: '请放心填写电话，仅接单后可见' }, must: true },
		{ mark: 'desc', title: '详细描述', type: 'textarea', must: true },
		{ mark: 'img', title: '相关图片', type: 'image', ext: { hint: '请放心上传，仅接单后可见' }, min: 0, max: 8, must: false },
	],

}