export default {
	namespaced: true,
	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}')
	}),
	mutations: {
		changeAddress(state, options) {
			state.address = options;
			uni.setStorageSync('address', JSON.stringify(state.address))
		}
	}
}
