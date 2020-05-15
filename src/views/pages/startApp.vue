<template>
	<div class="page-countainer"></div>
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
				let topath = newval.isLogin ? 'mainpage/home' : 'login'
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

<style lang="scss" scoped>
.page-countainer {
	background-image: url('../assets/img/bg.png');
	background-color: $theme-color;
	background-attachment: fixed;
	background-repeat: no-repeat;
	background-size: cover;
}
</style>
