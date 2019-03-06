<template>
  <div class="ui menu">

  <div class="item">
    <img src="../assets/logo.png">
  </div>
  <a class="active item">
    Home
  </a>
  <div class="right menu">
	  <div class="item">
		<img class="ui middle circular aligned mini image" src="https://semantic-ui.com/images/wireframe/square-image.png">
		<span style="margin-left:5px;">User Name</span>
	  </div>
    <div class="item">
        <div class="ui negative basic button">Logout</div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
