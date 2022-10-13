<template>
	<view>
		<my-login v-if="!token"></my-login>
		<my-user v-else></my-user>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		computed: {
			token() {
				return this.$store.state.m_user.token
			}
		}
	}
</script>

<style lang="scss">

</style>
