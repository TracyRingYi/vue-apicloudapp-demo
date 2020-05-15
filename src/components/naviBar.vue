<template>
	<div :style="{ zIndex: zIndex }" :class="naviTop">
		<van-nav-bar
			:title="title"
			left-arrow
			fixed
			:z-index="zIndex"
			@click-left="bindClickBack"
			@click-right="bindClickRight"
		>
			<van-icon v-if="showRight.show" :name="showRight.iconname" slot="right" />
		</van-nav-bar>
	</div>
</template>

<script>
import { NavBar, Icon } from 'vant'
export default {
	name: 'naviBar',
	components: {
		[NavBar.name]: NavBar,
		[Icon.name]: Icon
	},
	props: {
		title: {
			type: String,
			required: true
		},
		zIndex: {
			type: Number,
			default: 1
		},
		showRight: {
			type: Object,
			default: () => ({
				iconname: 'cross',
				show: false
			})
		},
		backReplace: {
			type: Boolean,
			default: false
		},
		replaceRoute: {
			type: String,
			default: '/mainpage/home'
		}
	},
	computed: {
		naviTop() {
			return this.$store.getters.naviTop
		}
	},
	methods: {
		bindClickBack() {
			if (this.backReplace) {
				this.$router.replace(this.replaceRoute)
			} else {
				this.$router.go(-1)
			}
		},
		bindClickRight() {
			this.$emit('bind-naviright')
		}
	}
}
</script>

<style scoped></style>
