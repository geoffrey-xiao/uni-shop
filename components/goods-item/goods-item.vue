<template>
	<view>
		<view class="goods-item" @click="goDetail(goods)">
			<image class="goods-img" :src="goods.goods_small_logo"></image>
			<view class="goods-detail">
				<view class="goods-name">
					{{goods.goods_name || ''}}
				</view>
				<view class="goods-price">
					${{goods.goods_price | toFixed}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "goods-item",
		props: {
			goods: {
				type: Object,
				default: {}
			}
		},
		filters: {
			toFixed(num) {
				if(num){
					return Number(num).toFixed(2)
				}
			}
		},
		data() {
			return {

			};
		},
		methods: {
			goDetail() {
				uni.navigateTo({
					url: `/subpkg/goods-detail/goods-detail?goods_id=${this.goods.goods_id}`,
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
