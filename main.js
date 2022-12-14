import App from './App'
import {
	$http
} from '@escook/request-miniprogram';
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false;
import store from '@/store/store.js'

uni.$http = $http;

$http.baseUrl = 'https://api-ugo-web.itheima.net';
// $http.baseUrl = 'https://api-hmugo-web.itheima.net'

$http.beforeRequest = (options) => {
	uni.showLoading({
		title: '数据加载中'
	})

	console.log(options)

	if (options.url.indexOf('/my/') !== -1) {
		options.header = {
			Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
		}
	}
};

$http.afterRequest = (options) => {
	uni.hideLoading()
}

uni.$showMsg = (title = '数据请求失败', duration = 1500) => {
	uni.showToast({
		title,
		icon: null,
		duration
	})
}
App.mpType = 'app'
const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
