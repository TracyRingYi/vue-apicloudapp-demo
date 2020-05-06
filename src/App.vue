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
<style>
@import 'style/common.css';
@import 'style/resetui.css';
html {
	height: 100%;
	background: #fff;
}
body,
#app,
.coutainer {
	height: 100%;
}
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>
