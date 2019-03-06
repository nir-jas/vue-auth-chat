<template>
  <div class="ui stackable three column centered grid container" style="padding-top:10vh;">
    <div class="column">
		<div class="ui fluid raised card">
			<div class="content">
      <div class="center aligned">
		<img src="../../assets/logo.png" width="50">
		<h2>Login</h2>
	</div>
	<div class="ui divider"></div>

      <Notification
        :message="notification.message"
        :type="notification.type"
        v-if="notification.message"
      />

      <form class="ui form" @submit.prevent="login">
        <div class="field">
          <label>Email</label>
          <input type="email" name="email" v-model="email" placeholder="Email" required>
        </div>

        <div class="field">
          <label>Password</label>
          <input type="password" name="password" v-model="password" placeholder="Password" required>
        </div>

        <button class="fluid ui primary button">LOG IN</button>

        <div class="ui hidden divider"></div>
      </form>

      <div class="ui divider"></div>

      <div class="ui column grid">
        <div class="center aligned column">
          <p>
            Don't have an account? <router-link to="/register">Create an account</router-link>
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
        name: 'Login',
        components: {
            Notification
        },
        data () {
            return {
                email: '',
                password: '',
                notification: {
                    message: '',
                    type: ''
                }
            }
        },
        beforeRouteEnter (to, from, next) {
            const token = store.get('token')

            return token ? next('/') : next()
        },
        methods: {
            login () {
                axios
                    .post('/login', {
                        email: this.email,
                        password: this.password,
                    })
                    .then(response => {
                        // save token in localstorage
                        store.set('token', response.data.data.token.token)
						store.set('user', response.data.data.user)
						
						// redirect to user home
                        this.$router.push('/')
                    })
                    .catch(error => {
                        // clear form inputs
						this.email = this.password = ''
						let options = {
                            message: error.response.data.message,
                            type: 'error'
						};
						if (error.response.data.data)
							options.mesage = error.response.data.data[0].message

                        // display error notification
                        this.notification = Object.assign({}, this.notification, options)
                    })
            }
        }
    }
</script>