<template>
	<div class="btn-box" @click="bindTouchBtn">
		<div class="btn-icon" :style="{ background: color }">
			<van-icon :name="name" color="#fff" size="30px" />
		</div>
		<div class="text-default text-center">{{ doc }}</div>
	</div>
</template>

<script>
import { Icon } from 'vant'

export default {
	name: 'navBtn',
	components: {
		[Icon.name]: Icon
	},
	props: {
		name: {
			type: String,
			required: true
		},
		color: {
			type: String,
			default: '#3987b8'
		},
		doc: {
			type: String,
			default: ''
		},
		payload: {
			type: Object
		}
	},
	methods: {
		bindTouchBtn() {
			this.$emit('bindev', this.payload)
		}
	}
}
</script>

<style scoped>
.btn-box {
	width: 25%;
	display: flex;
	align-items: center;
	flex-direction: column;
}
.btn-icon {
	border-radius: 5px;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 12px;
	width: 30px;
	margin: 5px 0;
}
.text-center {
	text-align: center;
	font-size: 12px;
	line-height: 2;
}
</style>
