<template>
	<view>
		<view class="search-container">
			<uni-search-bar :focus="true" v-model="searchValue" @input="input" cancelButton="none" bgColor="#fff"
				radius="18" placeholder="请输入搜索内容">
			</uni-search-bar>
		</view>
		<view class="suggest-list" v-if="searchResults.goods.length">
			<view class="suggest-item" v-for="item in searchResults.goods" :key="item.goods_id" @click="goDetail(item)">
				<view class="goods_name">{{item.goods_name}}</view>
				<uni-icons type="right" size="10"></uni-icons>
			</view>
		</view>
		<view class="history-box" v-else>
			<view class="history-header">
				<view class="hitory-title">
					搜索历史
				</view>
				<uni-icons type="trash" size="20" @click="clearHistory"></uni-icons>
			</view>
			<view class="history-content">
				<view class="history-item" v-for="(item,i) in historyList" :key="i" @click="goGoodsList(item)">
					<uni-tag :text="item"></uni-tag>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchValue: '',
				timer: null,
				searchResults: null,
				keyWords: '',
				historyList: []
			};
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		},
		methods: {
			input(e) {
				this.timer && clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					console.log(e)
					this.keyWords = e
					this.search()
				}, 500)
			},
			async search() {
				if (!this.keyWords) {
					this.searchResults = [];
					return
				}
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search', {
					query: this.keyWords
				})
				if (res.meta.status !== 200) return;
				this.searchResults = res.message;
				this.saveHistory(this.keyWords)
			},
			saveHistory(kw) {
				!this.historyList.includes(kw) && this.historyList.push(kw);
				uni.setStorageSync('kw', JSON.stringify(this.historyList))
			},
			clearHistory() {
				this.historyList = []
				uni.setStorageSync('kw', '[]')
				console.log(22)
			},
			goDetail(item) {
				uni.navigateTo({
					url: `/subpkg/goods-detail/goods-detail?goods_id=${item.goods_id}`
				})
			},
			goGoodsList(kw) {
				uni.navigateTo({
					url: `/subpkg/goods-list/goods-list?query=${kw}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.search-container {
		background-color: #c00000;
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.suggest-list {
		.suggest-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px 5px;
			border-bottom: 1px solid #eee;

			.goods_name {
				flex: 1;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				font-size: 12px;
			}
		}
	}

	.history-box {
		.history-header {
			display: flex;
			justify-content: space-between;
			padding: 10px;
			border-bottom: 1px solid #eee;
		}

		.history-content {
			padding: 10px;
			display: flex;
			flex-wrap: wrap;
			gap: 10px;
			// .history-item{
			// 	padding: 4px;
			// 	background-color: #eee;
			// }
		}
	}
</style>
