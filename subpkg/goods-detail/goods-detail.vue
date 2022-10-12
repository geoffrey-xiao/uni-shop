<template>
	<view class="goods-detail-box">
		<swiper autoplay interval="2000" indicator-dots="#fff">
			<swiper-item v-for="(item,i) in goodsDetail.pics" :key="item.pics_id">
				<image :src="item.pics_big_url" @click="preview(i)"></image>
			</swiper-item>
		</swiper>
		<view class="goods-detail">
			<view class="goods-price">
				${{goodsDetail.goods_price}}
			</view>
			<view class="goods-name-fav">
				<view class="goods-name">
					{{goodsDetail.goods_name}}
				</view>
				<view class="goods-fav">
					<uni-icons type="star" size="20"></uni-icons>
					收藏
				</view>
			</view>
			<view class="goods-freight">
				快递：免运费
			</view>
		</view>
		<rich-text :nodes="goodsDetail.goods_introduce">

		</rich-text>
		<div class="goods-nav-container">
			<uni-goods-nav :fill="true" :options="options" :button-group="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsDetail: null,
				options: [{
					icon: 'chat',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					info: 2,
					infoBackgroundColor: '#007aff',
					infoColor: "#f5f5f5"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
						color: '#fff'
					}
				],
			};
		},

		onLoad(options) {
			this.getGoodsDetail(options.goods_id)
		},
		methods: {
			async getGoodsDetail(goods_id) {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id
				})
				if (res.meta.status !== 200) return;
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,
					'<img style="display:block;" ').replace(/webp/g, 'jpg')
				this.goods_info = res.message
				console.log(this.goodsDetail)
			},
			preview(i) {
				uni.previewImage({
					urls: this.goodsDetail.pics.map(item => item.pics_big),
					current: i
				})
			},
			onClick(e) {
				uni.switchTab({
					url:'/pages/cart/cart'
				})
			},
			buttonClick(e) {
				console.log(e)
				this.options[2].info++
			}
		}
	}
</script>

<style lang="scss">
	.goods-detail-box{
		padding-bottom: 60px;
	}
	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.goods-detail {
		padding: 5px;

		.goods-price {
			color: #c00000;
		}

		.goods-name-fav {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 5px 0;
			font-size: 14px;

			.goods-fav {
				color: gray
			}
		}

		.goods-freight {
			font-size: 12px;
			color: gray
		}
	}
	.goods-nav-container{
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 999;
	}
</style>
