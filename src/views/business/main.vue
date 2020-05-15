<template>
	<div class="page_coutainer">
		<keep-alive>
			<router-view />
		</keep-alive>
		<webTabbar :tabbar="tabbar" :activecolor="themeColor" />
	</div>
</template>

<script>
import webTabbar from '@/components/webTabbar'
export default {
	name: 'mainpage',
	components: {
		webTabbar
	},
	data() {
		return {
			tabbar: [
				{
					name: 'home',
					icon: 'hotel-o',
					text: '首页'
				},
				{
					name: 'trip',
					icon: 'bag-o',
					text: '行程'
				},
				{
					name: 'survice',
					icon: 'like-o',
					text: '酒店服务'
				},
				{
					name: 'user',
					icon: 'user-o',
					text: '我的'
				}
			]
		}
	},
	computed: {
		screenTop() {
			return this.$store.getters.screenTop
		},
		includePage() {
			return this.$store.state.includePage
		},
		themeColor() {
			return this.$root.themeColor
		}
	}
}
</script>
