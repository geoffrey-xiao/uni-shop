<template>
	<view>
		<view class="goods-list">
			<goods-item v-for="item in goodsList" :key="item.goods_id" :item="item"></goods-item>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj: {
					query: '',
					cid: '5',
					pageNum: 1,
					pageSize: 10
				},
				goodsList: [],
				total: 0,
				loading: false
			};
		},
		onLoad(options) {
			this.queryObj.query = '';
			this.queryObj.cid = options.cid || 5;
			this.getGoodsList()
		},
		onReachBottom() {
			if (this.queryObj.pageNum * this.queryObj.pageSize >= this.total) return uni.$showMsg('数据加载完毕')
			if (loading) return
			this.queryObj.pageNum += 1;
			this.getGoodsList()
		},

		onPullDownRefresh() {
			this.queryObj.pageNum = 1;
			this.goodsList = [];
			this.total = 0;
			this.loading=false
			this.getGoodsList(() => uni.stopPullDownRefresh())
		},
		methods: {
			async getGoodsList(cb) {
				this.loading = true
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				this.loading = false
				cb && cb()
				if (res.meta.status !== 200) return;
				this.goodsList = [...this.goodsList, ...res.message.goods];
				this.total = res.message.total
				console.log(this.goodsList)
			}
		}
	}
</script>

<style lang="scss">
	.goods-list {
		.goods-item {
			display: flex;
			padding: 10px;

			.goods-img {
				display: block;
				height: 100px;
				margin-right: 5px;
			}

			.goods-detail {
				font-size: 12px;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.goods-name {}

				.goods-price {
					color: #c00000;
				}

			}
		}
	}
</style>
