<template>
  <div class="ui stackable three column centered grid container" style="padding-top:10vh;">
    <div class="column">
		<div class="ui fluid raised card">
			<div class="content">
				<div class="center aligned">
					<img src="../../assets/logo.png" width="50">
					<h2>Create an account</h2>
				</div>
				<div class="ui divider"></div>
				<Notification
					:message="notification.message"
					:type="notification.type"
					v-if="notification.message"
				/>

				<form class="ui form" @submit.prevent="signup">
					<div class="field" :class="{ error: errors.has('name') }">
					<label>Full Name</label>
					<input
						type="text"
						name="name"
						v-model="name"
						v-validate="'required'"
						placeholder="Full name"
					>
					<span v-show="errors.has('name')" class="is-danger">{{ errors.first('name') }}</span>
					</div>

					<div class="field" :class="{ error: errors.has('email') }">
					<label>Email</label>
					<input
						type="email"
						name="email"
						:class="{'input': true, 'is-danger': errors.has('email') }"
						v-model="email"
						v-validate="'required|email'"
						placeholder="Email"
					>
					<span v-show="errors.has('email')" class="is-danger">{{ errors.first('email') }}</span>
					</div>

					<div class="field" :class="{ error: errors.has('password') }">
					<label>Password</label>
					<input
						type="password"
						name="password"
						:class="{'input': true, 'is-danger': errors.has('password') }"
						v-model="password"
						v-validate="'required|min:6'"
						placeholder="Password"
						ref="password"
					>
					<span v-show="errors.has('password')" class="is-danger">{{ errors.first('password') }}</span>
					</div>

					<div class="field" :class="{ error: errors.has('confirm_password') }">
					<label>Confirm Password</label>
					<input
						type="password"
						name="confirm_password"
						:class="{'input': true, 'is-danger': errors.has('confirm_password') }"
						v-model="confirm_password"
						v-validate="'required|confirmed:password'"
						placeholder="Confirm Password" data-vv-as="password">
					<span
						v-show="errors.has('confirm_password')"
						class="is-danger"
					>{{ errors.first('confirm_password') }}</span>
					</div>

					<button class="fluid ui primary button" :disabled="!isFormValid">SIGN UP</button>

					<div class="ui hidden divider"></div>
				</form>

				<div class="ui divider"></div>

				<div class="ui column grid">
					<div class="center aligned column">
					<p>Already have an account?
						<router-link to="/login">Log In</router-link>
					</p>
					</div>
				</div>
			</div>
		</div>
    </div>
  </div>
</template>

<script>
import Notification from '@/components/Notification'

export default {
  name: 'SignUpForm',
  components: {
    Notification
  },
  data () {
    return {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
      notification: {
        message: '',
        type: ''
      }
    }
  },
  computed: {
    isFormValid () {
      return Object.keys(this.fields).every(key => this.fields[key].valid)
    }
  },
  beforeRouteEnter (to, from, next) {
    const token = store.get('token')

    return token ? next('/') : next()
  },
  methods: {
    signup () {
      // eslint-disable-next-line
      axios
        .post('/register', {
          name: this.name,
          email: this.email,
		  password: this.password,
		  confirm_password: this.confirm_password
        })
        .then(response => {
          // save token in localstorage
		  store.set('token',response.data.data.token.token)
          store.set('user', response.data.data.user)

          // redirect to user home
          this.$router.push('/')
        })
        .catch(error => {
          // display error notification
          this.notification = Object.assign({}, this.notification, {
            message: error.response.data.data[0].message,
            type: 'error'
          })
        })
    }
  }
}
</script>
