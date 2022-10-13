<template>
	<view class="">
		<view v-if="carts.length!==0">
			<my-address></my-address>
			<view class="cart-title">
				<uni-icons type="cart" size="30"></uni-icons>购物车
			</view>
			<uni-swipe-action>
				<block v-for="(item,i) in carts" :key="i">
					<uni-swipe-action-item :options="options" @click="swipeAction">
						<view class="cart-item">
							<view class="cart-item-left">
								<radio checked color="#c00000" :checked="item.goods_state" @click="radioChange(item)">
								</radio>
								<image :src="item.pics[0].pics_big_url" class="goods-img"></image>
							</view>
							<view class="cart-item-right">
								<view class="goods-name">
									{{item.goods_name}}
								</view>
								<view class="goods-price-num">
									<view class="goods-price">
										${{item.goods_price}}
									</view>
									<uni-number-box :min="1" v-model="item.goods_count"
										@change="changecount(value,item)">
									</uni-number-box>
								</view>
							</view>
						</view>
					</uni-swipe-action-item>
				</block>

			</uni-swipe-action>
			<my-settle></my-settle>
		</view>
		<view class="empty-cart" v-else>
			<image src="../../static/cart_empty@2x.png"></image>
			<text class="empty-text">空空如也</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				options: [{
					text: '删除', // 显示的文本内容
					style: {
						backgroundColor: '#C00000' // 按钮的背景颜色
					}
				}]
			};
		},
		onShow() {
			uni.setTabBarBadge({
				index: 2,
				text: this.total + ''
			})
		},
		computed: {
			total() {
				return this.$store.getters['m_cart/total']
			},
			carts() {
				console.log(this.$store.state.m_cart.carts)
				return this.$store.state.m_cart.carts
			}
		},
		methods: {
			addcount() {
				this.$store.commit('m_cart/addCount')
			},
			radioChange(item) {
				const a = {
					...item,
					goods_state: !item.goods_state
				}
				console.log(a)
				this.$store.commit('m_cart/changeChecked', a)
			},
			changecount(value, item) {
				console.log(value, item)
				this.$store.commit('m_cart/changeNum', item)
			},
			swipeAction() {
				console.log(222)
			}
		}
	}
</script>

<style lang="scss">
	.cart-title {
		display: flex;
		align-items: center;
		padding: 10px;
		border-bottom: 1px solid #eee;
	}


	.cart-item {
		width: 750rpx;
		box-sizing: border-box;
		padding: 10px;
		display: flex;
		justify-content: space-between;

		.cart-item-left {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.goods-img {
			margin: 0 5px;
			width: 100px;
			height: 100px;
		}

		.cart-item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.goods-name {
				font-size: 12px;
			}

			.goods-price-num {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.goods-price {
				color: #c00000;
			}
		}
	}

	.empty-cart {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-top: 150px;

		image {
			width: 90px;
			height: 90px;
		}

		.empty-text {
			margin-top: 15px;
			font-size: 12px;
			color: gray;
		}

	}
</style>
