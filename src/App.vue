<template>
	<div id="app" :class="screenTop">
		<router-view />
	</div>
</template>
<script>
export default {
	name: 'App',
	computed: {
		screenTop() {
			return this.$store.getters.screenTop
		}
	}
}
</script>
