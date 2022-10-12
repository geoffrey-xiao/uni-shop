<template>
	<view>
		<view class="scroll-view-container">
			<scroll-view scroll-y="true" :style="{height: wh + 'px'}" class="left-scroll-view">
				<block v-for="(item,i) in cateList" :key="i">
					<view :class="['left-scroll-view-item', i===active?'active':'']" @click="changeCate(i)">
						{{item.cat_name}}
					</view>
				</block>
			</scroll-view>
			<scroll-view scroll-y="true" :style="{height: wh + 'px'}" class="right-scroll-view" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item2,i2) in cateLevel2" :key="i2">
					<view class="cate-lv2-title">/{{item2.cat_name}}/</view>
					<view class="cate-lv3-list">
						<view class="cate-lv3-item" v-for="(item3,i3) in item2.children" :key="i3"
						@click="goGoodList(item3)">
							<image :src="item3.cat_icon.replace('dev','web')"></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wh: '',
				cateList: [],
				cateLevel2: [],
				active: 0,
				scrollTop: 0
			};
		},
		onLoad() {
			// 获取当前系统的信息
			const sysInfo = uni.getSystemInfoSync()
			// 为 wh 窗口可用高度动态赋值
			this.wh = sysInfo.windowHeight
			this.getCategoryList()
		},
		methods: {
			async getCategoryList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories');
				if (res.meta.status !== 200) return uni.$showMsg()
				this.cateList = res.message;
				this.cateLevel2 = res.message[0].children
			},
			changeCate(i) {
				this.active = i;
				this.cateLevel2 = this.cateList[i].children;
				this.scrollTop = this.scrollTop  ? 0 : 1;
			},
			goGoodList(item){
				uni.navigateTo({
					url:`/subpkg/goods-list/goods-list?cid=${item.cat_id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;

		.left-scroll-view {
			width: 80px;

			.left-scroll-view-item {
				position: relative;
				background-color: #f7f7f7;
				text-align: center;
				font-size: 12px;
				line-height: 60px;
			}

			.active {
				&::before {
					content: '';
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
					width: 3px;
					height: 30px;
					background-color: #c00000;
				}
			}
		}

		.right-scroll-view {
			flex: 1;

			.cate-lv2-title {
				padding: 20px 0 10px 0;
				text-align: center;
				font-size: 12px;
				font-weight: 600;
			}

			.cate-lv3-list {
				display: flex;
				flex-wrap: wrap;

				.cate-lv3-item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					margin-bottom: 10px;
					width: 33.33%;

					image {
						width: 60px;
						height: 60px;
					}

					text {
						font-size: 12px;
					}
				}
			}

		}
	}
</style>
