<template>
<div>
  <div class="ui menu">

  <div class="item">
    <img src="../assets/logo.png">
  </div>
  <a class="active item">
    Home
  </a>
  <div class="right menu">
	  <div class="item">
		<img class="ui middle circular aligned mini image" :src="'https://ui-avatars.com/api/?background=0D8ABC&color=fff&rounded=true&name='+user.name">
		<span style="margin-left:5px;">{{user.name}}</span>
	  </div>
    <div class="item">
        <div class="ui negative basic button" @click="logout">Logout</div>
    </div>
  </div>
</div>
<div class="ui stackable two column centered grid " style="padding-top:10px;">
    <div class="column">
		<div class="ui fluid raised card">
			<div class="content">
				<div class="ui placeholder" v-if='showLoader'>
					<div class="image header">
						<div class="medium line"></div>
						<div class="full line"></div>
					</div>
					<div class="image header">
						<div class="medium line"></div>
						<div class="full line"></div>
					</div>
					<div class="image header">
						<div class="medium line"></div>
						<div class="full line"></div>
					</div>
					<div class="image header">
						<div class="medium line"></div>
						<div class="full line"></div>
					</div>
				</div>
				<div class="ui placeholder segment" v-if="messages.length==0&&!showLoader">
					<div class="ui icon header">
						<i class="comments outline icon"></i>
						Be the first person to say Hi . . .!
					</div>
					<div class="ui primary button" @click="sayHi">Say Hi</div>
				</div>
				<div v-if="messages.length>0&&!showLoader">
					<div class="ui comments" style="min-height:75vh;max-height:75vh;overflow-y:scroll;max-width:100%;">
						<div class="comment" v-for="item in messages.slice().reverse()" :key=item.id>
							<a class="avatar">
							<img :src="'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name='+item.user.name">
							</a>
							<div class="content">
							<a class="author">{{item.user.name}}</a>
							<div class="metadata">
								<div class="date">{{item.created_at | moment("from")}}</div>
							</div>
							<div class="text">
								{{item.message}}
							</div>
							</div>
						</div>
					</div>
					<form @submit.prevent='sendMessage'>
						<div class="ui fluid action input">
								<input type="text" name="message" v-model="message" placeholder="Say Hi..." required>
								<button type="submit" class="ui button primary">
									<i class="icon paper plane" style="margin-right:10px;"></i> 
									Send
								</button>
						</div>
					</form>
				</div>
				
			</div>
		</div>
    </div>
  </div>
</div>
</template>

<script>

    export default {
        name: 'Home',
        components: {
        },
        data () {
            return {
				user: store.get('user'),
				message:'',
				messages: [],
				currentPage: 1,
				lastPage:1,
				showLoader:true
            }
        },
        beforeRouteEnter (to, from, next) {
            const token = store.get('token')

            return token ? next() : next('/login')
        },
        beforeMount () {
			this.getMessages()
        },
        methods: {
            getMessages(page=1) {
				axios.get('/messages',{
					headers: {
						'Authorization':`Bearer ${store.get('token')}`
					},
					qs: {
						page:page
					}
				})
				.then((response)=>{
					let res = response.data.data;
					this.messages = res.data;
					this.currentPage = res.page;
					this.lastPage = res.lastPage;
					this.showLoader =false;
				})
				.catch((error)=>{
					console.log(error);
				})
			},
			sendMessage() {
				axios.post('/message',{
					message:this.message
				},{
					headers: {
						'Authorization':`Bearer ${store.get('token')}`
					}
				})
				.then((response)=>{
					this.message = '';
					let message = response.data.data;

					message.user = {
						id:store.get('user').id,
						name:store.get('user').name,
						email:store.get('user').email
					}

					this.messages.unshift(message);
				})
				.catch((error)=>{
					console.log(error);
				})
			},
			sayHi() {
				this.message = 'Hi';
				this.$nextTick(()=>{
					this.sendMessage();
				})
			},
			logout() {
				store.clearAll()
				this.$router.push('/login')
			}
        }
    }
</script>