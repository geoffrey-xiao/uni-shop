<template>
	<view>
		<view class="goods-item" @click="goDetail(item)">
			<image class="goods-img" :src="item.goods_small_logo"></image>
			<view class="goods-detail">
				<view class="goods-name">
					{{item.goods_name | ''}}
				</view>
				<view class="goods-price">
					${{item.goods_price | toFixed}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "goods-item",
		props: {
			item: {
				type: Object,
				default: null
			}
		},
		filters: {
			toFixed(num) {
				return Number(num).toFixed(2)
			}
		},
		data() {
			return {

			};
		},
		methods: {
			goDetail() {
				uni.navigateTo({
					url: `/subpkg/goods-detail/goods-detail?goods_id=${this.item.goods_id}`,
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
