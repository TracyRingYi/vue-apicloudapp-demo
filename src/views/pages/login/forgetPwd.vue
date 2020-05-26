<template>
	<div class="page_coutainer forgetpwd">
		<div class="page_mid">
			<div class="input-box">
				<van-field
					:value="user.phonenumber"
					@input="bindPhoneNumber"
					type="tel"
					left-icon="phone-o"
					clearable
					placeholder="请输入手机号"
					maxlength="11"
				/>
				<van-field
					:value="sms"
					@input="bindSms"
					left-icon="bulb-o"
					placeholder="请输入验证码"
				>
					<van-button
						slot="button"
						:color="themeColor"
						size="small"
						type="primary"
						@click="bindGetSms"
						:disabled="gettingSms"
						>{{ smsBtnTxt }}</van-button
					>
				</van-field>
				<van-field
					:value="user.password"
					@input="bindPassword"
					left-icon="lock"
					type="password"
					placeholder="请输入密码"
				/>
			</div>
			<button
				class="btn-default btn-center"
				@click="bindRequest"
				:disabled="noinput"
				:class="btnClass"
			>
				确定
			</button>
		</div>
	</div>
</template>

<script>
import { Field, Toast, Button } from 'vant'
import LoginFetch from '@/survice/getData/login'
export default {
	name: 'forget-pwd',
	components: {
		[Field.name]: Field,
		[Toast.name]: Toast,
		[Button.name]: Button
	},
	data() {
		return {
			sms: '',
			user: {
				phonenumber: '',
				password: ''
			},
			time: 0,
			gettingSms: false,
			firstGetSms: true
		}
	},
	computed: {
		themeColor() {
			return this.$root.themeColor
		},
		noinput() {
			let { phonenumber, password } = this.user
			let sms = this.sms
			return !(phonenumber && password && sms)
		},
		btnClass() {
			let type = this.noinput ? 'btn-disable' : 'btn-primary'
			return type
		},
		smsBtnTxt() {
			let txt = this.gettingSms
				? '重新发送(' + this.time + 's)'
				: this.firstGetSms
				? '获取验证码'
				: '重新发送'
			return txt
		}
	},
	methods: {
		bindPhoneNumber(e) {
			this.user.phonenumber = e
		},
		bindSms(e) {
			this.sms = e
		},
		bindPassword(e) {
			this.user.password = e
		},
		bindRequest() {
			console.log('submit')
			Toast.loading({
				message: '处理中...',
				forbidClick: true
			})
			let { sms, user } = this
			LoginFetch.findPwd({
				sms,
				phone: user.phonenumber,
				password: user.password
			})
				.then((resp) => {
					if (resp.code == 0) {
						Toast.success(resp.msg)
						this.$router.push('login')
					} else {
						Toast.fail(resp.msg)
					}
				})
				.catch((err) => {
					console.log(err)
				})
		},
		bindGetSms() {
			let phonenumber = this.user.phonenumber
			if (!phonenumber) {
				Toast.fail('请输入手机号')
				return
			}
			if (this.firstGetSms) {
				this.firstGetSms = false
			}
			this.gettingSms = true
			console.log('request')
			LoginFetch.getSms({
				phone: phonenumber,
				type: 'findPwd'
			})
				.then((resp) => {
					if (resp.code == 0) {
						Toast.success(resp.msg)
						this.time = 60
						let clock = setInterval(() => {
							if (this.time == 0) {
								this.gettingSms = false
								clearInterval(clock)
								return
							}
							this.time -= 1
						}, 1000)
					} else {
						Toast.fail(resp.msg)
						this.gettingSms = false
					}
				})
				.catch((err) => {
					console.log(err)
				})
		}
	}
}
</script>

<style lang="scss">
.forgetpwd {
	.page_mid {
		width: 100%;
		height: 520px;
		display: flex;
		flex-direction: column;
	}
	.btn-center {
		margin: 50px auto 0;
	}
	.input-box {
		width: 300px;
		align-self: center;
	}
}
</style>
