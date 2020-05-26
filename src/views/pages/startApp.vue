<template>
	<div class="start-app"></div>
</template>

<script>
export default {
	name: 'startApp',
	computed: {
		user() {
			return this.$store.state.login
		}
	},
	watch: {
		user: {
			handler(newval) {
				let topath = newval.isLogin ? 'main' : 'login'
				this.$router.replace(topath)
			},
			deep: true
		}
	},
	mounted() {
		this.$store.dispatch('STARTAPP')
	}
}
</script>

<style lang="scss">
.start-app {
	background-color: $theme-color;
	background-attachment: fixed;
	background-repeat: no-repeat;
	background-size: cover;
}
</style>
