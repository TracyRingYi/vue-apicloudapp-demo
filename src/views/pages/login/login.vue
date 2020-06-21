<template>
	<div class="page_coutainer login">
		<div class="page_mid">
			<div class="text-title text-center">vue+apiCloud</div>
			<form class="input-box">
				<van-field
					:value="username"
					@input="bindUserName"
					left-icon="user-o"
					clearable
					placeholder="请输入账户"
				/>
				<van-field
					:value="password"
					@input="bindPassword"
					left-icon="lock"
					type="password"
					placeholder="请输入密码"
				/>
			</form>
			<button
				class="btn-default btn-center"
				@click="bindlogin"
				:disabled="noinput"
				:class="btnClass"
			>登录</button>
			<section class="section_box flex-between text-default">
				<p @click="bindForgetPwd">忘记密码</p>
				<div>|</div>
				<p @click="bindSignUp">立即注册</p>
			</section>
			<section class="section_box text-default">
				<p class="text-center">其他第三方</p>
				<div class="flex-between">
					<div class="login-wechat logo_box" @click="bindLoginWithWechat"></div>
					<div>|</div>
					<div class="login-alipay logo_box" @click="bindLoginWithAlipay"></div>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
import { Field, Toast } from 'vant'
export default {
	name: 'login',
	components: {
		[Field.name]: Field,
		[Toast.name]: Toast
	},
	data() {
		return {
			logining: false,
			username: '',
			password: ''
		}
	},
	computed: {
		user() {
			return this.$store.state.login
		},
		noinput() {
			return !(this.username && this.password)
		},
		btnClass() {
			return this.noinput ? 'btn-disable' : 'btn-primary'
		}
	},
	watch: {
		user: {
			handler(newval) {
				if (!this.logining) return
				this.logining = false
				Toast.clear()
				if (newval.isLogin && newval.message == 0) {
					//跳转
					console.log('jump')
					this.$router.replace('/main')
				} else {
					this.handleLoginFail(newval.message)
				}
			},
			deep: true
		}
	},
	mounted() {
		if (this.user.username) {
			this.username = this.user.username
		}
	},
	methods: {
		handleLoginFail(msg) {
			let message = msg ? msg : '登录失败'
			Toast.fail(message)
		},
		bindlogin() {
			if (this.logining) return
			if (this.noinput) {
				Toast.fail('请填写用户名或密码')
				return
			}
			Toast.loading({
				mask: true,
				message: '登录中...'
			})
			this.logining = true
			this.$store.dispatch('LOGIN', {
				username: this.username,
				password: this.password
			})
		},
		bindUserName(e) {
			this.username = e
		},
		bindPassword(e) {
			this.password = e
		},
		bindForgetPwd() {
			this.$router.push('/forgetpwd')
		},
		bindSignUp() {
			this.$router.push('/signup')
		},
		bindLoginWithWechat() {
			console.log('wechat')
		},
		bindLoginWithAlipay() {
			console.log('alipay')
		}
	}
}
</script>

<style lang="scss">
.login {
	&.page_coutainer {
		align-items: center;
	}
	.page_mid {
		width: 100%;
		height: 420px;
		display: flex;
		flex-direction: column;
	}
	.text-title {
		margin-bottom: 50px;
	}
	.input-box {
		width: 300px;
		align-self: center;
	}
	.section_box {
		padding: 10px 30px;
	}
	.flex-between {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.logo_box {
		height: 50px;
		width: 50px;
		/*border-radius: 50%;*/
		background-size: cover;
	}
	.login-wechat {
		background-image: url('../../../assets/img/logo_wechat.png');
	}
	.login-alipay {
		background-image: url('../../../assets/img/logo_alipay.png');
	}
}
</style>
