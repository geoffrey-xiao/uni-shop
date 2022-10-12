<template>
	<view>
		<view class="search-box">
			<my-search
			@gotoSearch="goSearch"></my-search>
		</view>
		<swiper indicator-dots autoplay duration="2000">
			<swiper-item v-for="(item,i) in swiperList" :key="item.goods_id">
				<navigator class="swiper-item" :url="`/subpkg/goods-detail/goods-detail?goodsId=${item.goods_id}`">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<view class="nav-list">
			<view class="nav-item" v-for="(item,i) in navList" @click="goItem(item)">
				<image :src="item.image_src" class="nav-item-img"></image>
				<!-- {{item.name}} -->
			</view>
		</view>
		<view class="floor-list">
			<view class="floor-item" v-for="(item,i) in floorList">
				<image class="floor-item-title" :src="item.floor_title.image_src">
				</image>
				<view class="floor-imgs">
					<navigator class="floor-imgs-left" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src"
							:style="{width:`${item.product_list[0].image_width}rpx`}" mode="widthFix"></image>
					</navigator>
					<view class="floor-imgs-right">
						<navigator class="floor-img-item" v-for="ele in item.product_list.slice(1)" :url="ele.url">
							<image :src="ele.image_src" :style="{width:`${ele.image_width}rpx`}" mode="widthFix">
							</image>
						</navigator>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				navList: [],
				floorList: []
			};
		},
		methods: {
			async getSwiperList() {
				const {
					data
				} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if (data.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.swiperList = data.message;
			},
			async getNavList() {
				const {
					data
				} = await uni.$http.get('/api/public/v1/home/catitems')
				console.log(data)
				if (data.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.navList = data.message
			},
			async getFloorList() {
				const {
					data
				} = await uni.$http.get('/api/public/v1/home/floordata')
				console.log(data)
				if (data.meta.status !== 200) {
					return uni.$showMsg()
				}
				data.message.forEach(item => {
					item.product_list.forEach(ele => {
						ele.url = `/subpkg/goods-list/goods-list?${ele.navigator_url.split('?')[1]}`
					})
				})
				this.floorList = data.message
				console.log(this.floorList)
			},
			goItem(item) {
				console.log(item)
				if (item.name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}

			},
			goSearch(){
				console.log('222')
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		},
		onLoad() {
			this.getSwiperList();
			this.getNavList();
			this.getFloorList()
		}
	}
</script>

<style lang="scss">
	.search-box{
		position: sticky;
		top: 0;
		z-index: 999;
	}
	swiper-item {
		height: 350rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {
		display: flex;
		padding: 10px 0;

		.nav-item {
			flex: 1;
			text-align: center;

			.nav-item-img {
				width: 64px;
				height: 64px;
			}
		}
	}

	.floor-list {
		.floor-item {
			.floor-item-title {
				width: 100%;
				height: 60rpx;
			}

			.floor-imgs {
				display: flex;

				.floor-imgs-left {
					padding-right: 10rpx;
				}

				.floor-imgs-right {
					flex: 1;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-around;

				}
			}
		}
	}
</style>
