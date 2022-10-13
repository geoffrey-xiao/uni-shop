<template>
	<view class="settle-container">
		<view class="settle-radio" @click="changeAllState">
			<radio :checked="fullChecked" color="#c00000"></radio>
			全选
		</view>
		<view class="settle-total">合计
			<text class="amount">${{totalPrice}}</text>
		</view>
		<view class="settle-btn">结算
			{{totalcount}}
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-settle",
		data() {
			return {

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
			}
		},
		methods: {
			changeAllState() {
				this.$store.commit('m_cart/updateGoodsState', !this.fullChecked)
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
