<template>
	<view>
		<view class="address-btn" v-if="Object.keys(address).length===0">
			<button type="primary" size="mini" @click="chooseAddress">请选择收货地址+</button>
		</view>
		<view class="address-detail" v-else>
			<view class="row1">
				<view class="row1-left">
					<view class="username">收货人：<text>{{address.userName}}</text></view>
				</view>
				<view class="row1-right">
					<view class="phone">电话：<text>{{address.telNumber}}</text></view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">收货地址：</view>
				<view class="row2-right">{{addressStr}}</view>
			</view>
		</view>
		<image src="../../static/cart_border@2x.png" class="cart-border"></image>
	</view>
</template>

<script>
	export default {
		name: "my-address",
		data() {
			return {
				address: {},
			};
		},
		computed: {
			addressStr() {
				return `${this.address.provinceName}${this.address.cityName}${this.address.detailInfo}`
			}
		},
		methods: {
			async chooseAddress() {
				const [err, succ] = await uni.chooseAddress().catch(err => err)
				console.log(err, succ)
				if (err === null && succ.errMsg === 'chooseAddress:ok') {
					this.address = succ;
					this.$store.commit('m_user/changeAddress', this.address)
				}
			}
		}
	}
</script>

<style lang="scss">
	.cart-border {
		width: 100%;
		height: 4px;
	}

	.address-btn {
		height: 90px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.address-detail {
		font-size: 12px;
		height: 90px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 5px;

		// 第一行
		.row1 {
			display: flex;
			justify-content: space-between;

			.row1-right {
				display: flex;
				align-items: center;

				.phone {
					margin-right: 5px;
				}
			}
		}

		// 第二行
		.row2 {
			display: flex;
			align-items: center;
			margin-top: 10px;

			.row2-left {
				white-space: nowrap;
			}
		}
	}
</style>
