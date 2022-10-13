<template>
	<view class="info-container">
		<view class="user-info">
			<view class="user-avatar">
				<image :src="userInfo.avatarUrl" class="user-img"></image>
			</view>
			<text>test</text>
		</view>
		<view class="user-detail">
			<view class="detail-item" v-for="item in infos" :key="item.id">
				<text>{{item.num}}</text>
				<text>{{item.text}}</text>
			</view>
		</view>
		<!-- 第二个面板 -->
		<view class="panel">
			<!-- 面板的标题 -->
			<view class="panel-title">我的订单</view>
			<!-- 面板的主体 -->
			<view class="panel-body">
				<!-- 面板主体中的 item 项 -->
				<view class="panel-item">
					<image src="/static/my-icons/icon1.png" class="icon"></image>
					<text>待付款</text>
				</view>
				<view class="panel-item">
					<image src="/static/my-icons/icon2.png" class="icon"></image>
					<text>待收货</text>
				</view>
				<view class="panel-item">
					<image src="/static/my-icons/icon3.png" class="icon"></image>
					<text>退款/退货</text>
				</view>
				<view class="panel-item">
					<image src="/static/my-icons/icon4.png" class="icon"></image>
					<text>全部订单</text>
				</view>
			</view>
		</view>
		<!-- 第三个面板 -->
		<view class="panel">
			<view class="panel-list-item">
				<text>收货地址</text>
				<uni-icons type="arrowright" size="15"></uni-icons>
			</view>
			<view class="panel-list-item">
				<text>联系客服</text>
				<uni-icons type="arrowright" size="15"></uni-icons>
			</view>
			<view class="panel-list-item" @click="logout">
				<text>退出登录</text>
				<uni-icons type="arrowright" size="15"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-user",
		data() {
			return {
				infos: [{
						id: 'fav-shop',
						text: '收藏的店铺',
						num: 10
					},
					{
						id: 'fav-commdity',
						text: '收藏的商品',
						num: 10
					},
					{
						id: 'like-commdity',
						text: '关注的商品',
						num: 10
					},
					{
						id: 'step',
						text: '足迹',
						num: 10
					},
				]
			};
		},
		computed: {
			userInfo() {
				return this.$store.state.m_user.userInfo
			}
		},
		methods: {
			async logout() {
				const [err, succ] = await uni.showModal({
					confirmText: '确定',
					cancelText: '取消',
					title: '提示',
					content: '是否退出登录'
				}).catch(err => err)
				if (succ && succ.confirm) {
					this.$store.commit('m_user/updateUserInfo', {})
					this.$store.commit('m_user/updateToken', '')
					this.$store.commit('m_user/changeAddress', {})
				}
			}
		}
	}
</script>

<style lang="scss">
	.info-container {
		height: 100vh;
		background-color: #f7f7f7;
	}

	.user-info {
		width: 100%;
		height: 200px;
		background-color: #c00000;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
		color: #fff;

		.user-avatar {
			width: 60px;
			height: 60px;
			border-radius: 50%;
			overflow: hidden;
			border: 1px solid #fff;
		}

		.user-img {
			width: 100%;
			height: 100%
		}


	}

	.user-detail {
		background-color: #fff;
		margin: 0 10px;
		margin-top: -20px;
		padding: 10px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-radius: 4px;

		.detail-item {
			font-size: 12px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 5px;
		}
	}



	.panel {
		background-color: white;
		border-radius: 3px;
		margin: 8px 10px;

		.panel-list-item {
			height: 45px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 15px;
			padding: 0 10px;
		}

		.panel-title {
			line-height: 45px;
			padding-left: 10px;
			font-size: 15px;
			border-bottom: 1px solid #f4f4f4;
		}

		.panel-body {
			display: flex;
			justify-content: space-around;

			.panel-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				font-size: 13px;
				padding: 10px 0;

				.icon {
					width: 35px;
					height: 35px;
				}
			}
		}
	}
</style>
