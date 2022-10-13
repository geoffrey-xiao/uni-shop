<template>
	<view class="settle-container">
		<view class="settle-radio" @click="changeAllState">
			<radio :checked="fullChecked" color="#c00000"></radio>
			全选
		</view>
		<view class="settle-total">合计
			<text class="amount">${{totalPrice}}</text>
		</view>
		<view class="settle-btn" @click="goSettle">结算
			{{totalcount}}
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-settle",
		data() {
			return {
				seconds: 3,
				timer: null
			};
		},
		computed: {
			totalcount() {
				return this.$store.getters['m_cart/checkedCount']
			},
			fullChecked() {
				return this.$store.getters['m_cart/checkedCount'] === this.$store.getters['m_cart/total']
			},
			totalPrice() {
				return this.$store.getters['m_cart/totalPrice']
			},
			address() {
				return this.$store.state.m_user.address || ''
			},
			token() {
				return this.$store.state.m_user.token || ''
			},
			addressstr() {
				return this.$store.getters['m_user/addressstr']
			},
			cart() {
				return this.$store.state.m_cart.carts
			}
		},
		methods: {
			changeAllState() {
				this.$store.commit('m_cart/updateGoodsState', !this.fullChecked)
			},
			goSettle() {
				if (this.totalcount === 0) {
					return uni.$showMsg('请选择需要结算的商品')
				}
				if (!this.addressstr) {
					return uni.$showMsg('请选择收货地址')
				}
				if (!this.token) {
					return this.delayNavigate()
				}
				this.payOrder()
			},
			delayNavigate() {
				this.seconds = 3
				this.showTips(this.seconds)
				this.timer = setInterval(() => {
					this.seconds--
					if (this.seconds <= 0) {
						clearInterval(this.timer)
						return uni.switchTab({
							url: '/pages/my/my',
							success: () => {
								this.$store.commit('m_user/updateRedirect', {
									openType: 'switchTab',
									from: '/pages/cart/cart'
								})
							}
						})
					}
					this.showTips(this.seconds)
				}, 1000)
			},
			showTips(n) {
				uni.showToast({
					icon: "none",
					title: `请登录后再接算，${n}秒后跳到登录页面`,
					mask: true,
					duration: 1500
				})
			},
			async payOrder() {
				const orderInfo = {
					order_price: 0.01,
					consignee_addr: this.addressstr,
					goods: this.cart.filter(item => item.goods_state).map(goods => {
						return {
							goods_id: goods.goods_id,
							goods_number: goods.goods_count,
							goods_price: goods.goods_price
						}
					})
				}
				const {
					data: res
				} = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
				if (res.meta.status !== 200) return uni.$showMsg('创建订单失败')
				const orderNumber = res.message.order_number;
				const {
					data: res2
				} = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', {
					order_number: orderNumber
				});
				if (res2.meta.status !== 200) return uni.$showMsg('预付订单失败')
				const payInfo = res2.message.pay;

				const [err, succ] = await uni.requestPayment(payInfo)
				if (err) return uni.$showMsg('订单未支付');

				const {
					data: res3
				} = await uni.$http.post('/api/public/v1/my/orders/chkOrder', {
					order_number: orderNumber
				})
				if (res3.meta.status !== 200) return uni.$showMsg('订单未支付');
				uni.showToast({
					title: '支付成功',
					icon: 'success'
				})
			}
		}
	}
</script>

<style lang="scss">
	.settle-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px;
		width: 100%;
		box-sizing: border-box;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;

		.settle-total {
			.amount {
				margin-left: 10px;
				color: #c00000;
			}
		}

		.settle-btn {
			padding: 8px 24px;
			font-size: 14px;
			color: #fff;
			background-color: #c00000;
		}
	}
</style>
