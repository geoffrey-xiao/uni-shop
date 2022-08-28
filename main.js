import App from './App'
import {
	$http
} from '@escook/request-miniprogram';
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false;

uni.$http = $http;

$http.baseUrl = 'https://api-ugo-web.itheima.net'

$http.beforeRequest = (options) => {
	uni.showLoading({
		title: '数据加载中'
	})
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
	...App
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
