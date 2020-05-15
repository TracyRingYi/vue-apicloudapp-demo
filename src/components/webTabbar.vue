<template>
	<van-tabbar v-model="activeVal">
		<van-tabbar-item
			v-for="tabitem in tabbar"
			:key="tabitem.name"
			replace
			:icon="tabitem.icon"
			:to="tabitem.name"
			active-color="#07c160"
			>{{ tabitem.text }}</van-tabbar-item
		>
	</van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
	name: 'webTabbar',
	components: {
		[Tabbar.name]: Tabbar,
		[TabbarItem.name]: TabbarItem
	},
	props: {
		tabbar: {
			type: Array,
			required: true
		},
		active: {
			type: Number,
			required: true
		},
		activecolor: {
			type: String,
			default: '#1989fa'
		}
	},
	data() {
		return {
			activeVal: 0
		}
	},
	created() {
		this.getActive()
	},
	methods: {
		getActive() {
			let tabbar = this.tabbar
			console.log(this.$route)
			let thename = this.$route.name
			this.activeVal = 0
			for (let i = 0; i < tabbar.length; i++) {
				if (thename == tabbar[i].name) {
					this.activeVal = i
					return false
				}
			}
		}
	}
}
</script>
