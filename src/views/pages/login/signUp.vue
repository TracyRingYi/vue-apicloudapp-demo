<template>
	<div class="page_coutainer signup_coutainer">
		<div class="page_mid">
			<logo-box />
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
						color="#5a7ee1"
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
				<van-field
					:value="user.secpassword"
					@input="bindSecPassword"
					left-icon="lock"
					type="password"
					placeholder="请再次输入密码"
				/>
				<van-field
					type="tel"
					v-model="invitphone"
					left-icon="phone-o"
					clearable
					placeholder="请输入邀请人手机号（非必填）"
					maxlength="11"
				/>
			</div>
			<button
				class="btn-default btn-center"
				@click="bindSignUp"
				:disabled="noinput"
				:class="btnClass"
			>
				注册
			</button>
		</div>
	</div>
</template>

<script>
import { Field, Toast, Button } from 'vant'
import LogoBox from '@/components/display/logoBox'
import LoginFetch from '@/survice/getData/loginFetch'
export default {
	name: 'sign-up',
	components: {
		[Field.name]: Field,
		[Toast.name]: Toast,
		[Button.name]: Button,
		LogoBox
	},
	data() {
		return {
			sms: '',
			user: {
				phonenumber: '',
				password: '',
				secpassword: ''
			},
			invitphone: '',
			time: 0,
			gettingSms: false,
			firstGetSms: true
		}
	},
	computed: {
		noinput() {
			let { phonenumber, password, secpassword } = this.user
			let sms = this.sms
			return !(phonenumber && password && secpassword && sms)
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
		bindSecPassword(e) {
			this.user.secpassword = e
		},
		comparePasswords() {
			let { password, secpassword } = this.user
			return password === secpassword
		},
		bindSignUp() {
			console.log('SignUp')
			if (!this.comparePasswords()) {
				Toast.fail('密码不一致')
				return
			}
			let { sms, user, invitphone } = this
			LoginFetch.signUp({
				phone: user.phonenumber,
				password: user.password,
				sms,
				invitphone
			}).then((resp) => {
				if (resp.code == 0) {
					Toast.success(resp.msg)
					this.$store.commit('LOGIN_SUCCESS', {
						validity: new Date().getTime()
					})
				} else {
					Toast.fail(resp.msg)
				}
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
				type: 'signUp'
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
.signup_coutainer {
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
