<template>
	<view class="my-search-container"
	:style="{'backgroundColor':bgColor}"
	@click="goSearch">
		<view class="my-search-box"
		:style="{'border-radius':borderRaduis+'px'}">
			<uni-icons type="search" size="20"></uni-icons>
			搜索
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		props:{
			bgColor:{
				type:String,
				default:'#c00000'
			},			
			borderRaduis:{
				type:Number,
				default:18
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			goSearch(){
				this.$emit('gotoSearch')
			}
		}
	}
</script>

<style lang="scss">
.my-search-container{
	// background-color: #c00000;
	padding: 10px;
	.my-search-box{
		background-color: #fff;
		height: 36px;
		// border-radius: 18px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 14px;
	}
}
</style>