<template>
	<view class="login-container">
		<uni-icons type="contact" size="100" color="#ccc"></uni-icons>
		<button class="login-btn" @click="getUserInfo">一键登录</button>
		<text>登录后享受更多权益</text>
	</view>
</template>

<script>
	export default {
		name: "my-login",
		data() {
			return {

			};
		},
		computed: {
			redirect() {
				return this.$store.state.m_user.redirect
			}
		},
		methods: {
			getUserInfo(e) {
				let that = this
				uni.getUserProfile({
					desc: '你的授权信息',
					success(res) {
						console.log(res)
						const {
							userInfo
						} = res;
						that.$store.commit('m_user/updateUserInfo', userInfo)
						that.getToken(res)
					},
					fail(res) {
						return uni.$showMsg('您取消了登录授权！')
					}
				})
				// console.log(e)
			},

			async getToken(info) {
				const [err, res] = await uni.login({}).catch(err => err)
				console.log(res)
				if (err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')
				const query = {
					code: res.code,
					encryptedData: info.encryptedData,
					iv: info.iv,
					rawData: info.rawData,
					signature: info.signature
				}
				const {
					data: loginResult
				} = await uni.$http.post('/api/public/v1/users/wxlogin', query)
				// if (loginResult.meta.status !== 200) {
				// 	return uni.$showMsg('登录失败')
				// }
				uni.$showMsg('登录成功')
				this.$store.commit('m_user/updateToken', 'test')
				console.log(this.redirect)
				if (this.redirect && this.redirect.openType === 'switchTab') {
					uni.switchTab({
						url: this.redirect.from,
						complete: () => {
							this.$store.commit('m_user/updateDirect', null)
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.login-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 15px;
		padding: 100px 20px 0 20px;

		.login-btn {
			width: 100%;
			border-radius: 18px;
			background-color: #c00000;
			color: #fff;
		}

		text {
			font-size: 12px;
			color: gray;
		}
	}
</style>
