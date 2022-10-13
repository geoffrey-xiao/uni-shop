export default {
	namespaced: true,
	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || "{}") || '',
		token: uni.getStorageSync('token'),
		userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
		redirect: null
	}),
	mutations: {
		changeAddress(state, options) {
			state.address = options;
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
		updateUserInfo(state, options) {
			state.userInfo = options;
			uni.setStorageSync('userInfo', JSON.stringify(state.userInfo || {}))
		},
		updateToken(state, options) {
			state.token = options;
			uni.setStorageSync('token', state.token)
		},
		updateRedirect(state, options) {
			state.redirect = options
		}
	},
	getters: {
		addressstr(state) {
			if (!state.address.provinceName) return
			return `${state.address.provinceName}${state.address.cityName}${state.address.detailInfo}`
		}
	}
}
