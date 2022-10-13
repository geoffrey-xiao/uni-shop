export default {
	namespaced: true,
	state: () => ({
		carts: JSON.parse(uni.getStorageSync('carts') || '[]'),
		count: 0
	}),
	mutations: {
		saveStorage(state) {
			uni.setStorageSync('carts', JSON.stringify(state.carts) || '[]')
		},
		addCart(state, goods) {
			const hasGoods = state.carts.find(item => item.goods_id === goods.goods_id)
			if (!hasGoods) {
				state.carts.push(goods)
			} else {
				hasGoods.goods_count++
			}
			this.commit('m_cart/saveStorage')
		},
		addCount(state) {
			state.count++
		},
		changeChecked(state, goods) {
			let select = state.carts.find(item => item.goods_id === goods.goods_id)
			select.goods_state = goods.goods_state
			this.commit('m_cart/saveStorage')
		},
		changeNum(state, goods) {
			let select = state.carts.find(item => item.goods_id === goods.goods_id)
			select.goods_count = goods.goods_count
			this.commit('m_cart/saveStorage')
		},
		updateGoodsState(state, newstate) {
			state.carts.forEach(item => item.goods_state = newstate)
			this.commit('m_cart/saveStorage')
		},
	},
	actions: {

	},
	getters: {
		total(state) {
			let count = 0;
			state.carts.forEach(item => {
				count += item.goods_count
			})
			return count
		},
		checkedCount(state) {
			let count = state.carts.filter(item => item.goods_state).reduce((total, item) => total += item.goods_count,
				0)
			return count
		},
		totalPrice(state) {
			return state.carts.filter(item => item.goods_state).reduce((total, item) =>
					total += item.goods_price * item.goods_count, 0)
				.toFixed(2)
		}
	}
}
